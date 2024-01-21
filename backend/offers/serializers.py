from rest_framework import serializers
from .models import Offer, Category, OfferImage
from user_profiles.serializers import UserProfileSerializer


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


class OfferImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = OfferImage
        fields = ["id", "image"]


class OfferViewSerializer(serializers.ModelSerializer):
    owner = UserProfileSerializer(read_only=True)
    Category = CategorySerializer()
    images = serializers.ListSerializer(child=OfferImageSerializer(), read_only=True)

    class Meta:
        model = Offer
        fields = ["id", "title", "owner", "category", "price", "description", "images"]


class OfferSerializer(serializers.ModelSerializer):
    images = serializers.ListField(child=serializers.ImageField(), write_only=True)

    class Meta:
        model = Offer
        fields = ["title", "category", "price", "description", "images"]
    
    def create(self, validated_data):
        images_data = validated_data.pop("images")
        offer = Offer.objects.create(**validated_data)

        for image_data in images_data:
            OfferImage.objects.create(image=image_data, offer=offer)
        
        return offer
