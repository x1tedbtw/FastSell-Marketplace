from rest_framework import serializers
from .models import Offer, Category, OfferImage
from user_profiles.serializers import UserProfileSerializer


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["name"]


class OfferImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = OfferImage
        fields = ["id", "image"]


class OfferViewSerializer(serializers.ModelSerializer):
    owner = UserProfileSerializer(read_only=True)
    category = serializers.CharField(source="category.name", read_only=True)
    images = serializers.ListSerializer(child=OfferImageSerializer(), read_only=True)
    city = serializers.CharField(source="owner.location", read_only=True)

    class Meta:
        model = Offer
        fields = ["id", "title", "owner", "category", "price", "description", "images", "city"]


class OfferSerializer(serializers.ModelSerializer):
    images = serializers.ListField(child=serializers.ImageField(), write_only=True)
    category = serializers.CharField(write_only=True)

    class Meta:
        model = Offer
        fields = ["title", "category", "price", "description", "images"]
    
    def to_internal_value(self, data):
        internal_data = super().to_internal_value(data)

        category_name = internal_data.pop("category", None)
        if category_name:
            try:
                internal_data["category"] = Category.objects.get(name=category_name)
            except Category.DoesNotExist:
                raise serializers.ValidationError({"category": "Invalid category name"})
        
        return internal_data
    
    def create(self, validated_data):
        images_data = validated_data.pop("images")
        offer = Offer.objects.create(**validated_data)

        for image_data in images_data:
            OfferImage.objects.create(image=image_data, offer=offer)
        
        return offer
