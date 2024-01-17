from rest_framework import serializers
from .models import Offer, Category, Subcategory
from user_profiles.serializers import UserProfileSerializer


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class SubcategorySerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)

    class Meta:
        model = Subcategory
        fields = '__all__'


class OfferSerializer(serializers.ModelSerializer):
    owner = UserProfileSerializer(read_only=True)
    subcategory = SubcategorySerializer()

    class Meta:
        model = Offer
        fields = '__all__'
