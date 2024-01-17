from rest_framework import serializers
from .models import Offer, Category, Subcategory
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


class SubcategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Subcategory
        fields = ["id", "name"]


class OfferViewSerializer(serializers.ModelSerializer):
    owner = UserProfileSerializer(read_only=True)
    subcategory = SubcategorySerializer()

    class Meta:
        model = Offer
        fields = '__all__'


class OfferSerializer(serializers.ModelSerializer):
    class Meta:
        model = Offer
        fields = ["title", "subcategory", "price", "description"]
