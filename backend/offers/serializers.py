from rest_framework import serializers
from .models import Offer, Category, Subcategory, OfferImage
from user_profiles.serializers import UserProfileSerializer


class CategorySerializer(serializers.ModelSerializer):
    subcategories = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = ["id", "name", "subcategories"]
    
    def get_subcategories(self, obj):
        subcategories = Subcategory.objects.filter(category=obj)
        serializer = SubcategorySerializer(subcategories, many=True)
        return serializer.data


class ImageOfferSerializer(serializers.ModelSerializer):
    class Meta:
        model = OfferImages
        fields = '__all__'


class SubcategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Subcategory
        fields = ["id", "name"]

class OfferImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = OfferImage
        fields = "__all__"


class OfferViewSerializer(serializers.ModelSerializer):
    owner = UserProfileSerializer(read_only=True)
    subcategory = SubcategorySerializer()
    images = serializers.ListSerializer(child=OfferImageSerializer())

    class Meta:
        model = Offer
        fields = '__all__'


class OfferSerializer(serializers.ModelSerializer):
    images = serializers.ListField(child=serializers.ImageField(), write_only=True)

    class Meta:
        model = Offer
        fields = ["title", "subcategory", "price", "description", "images"]
    
    def create(self, validated_data):
        images_data = validated_data.pop("images")
        offer = Offer.objects.create(**validated_data)

        for image_data in images_data:
            image, created = OfferImage.objects.create(image=image_data)
            offer.images.add(image)
        
        return offer

