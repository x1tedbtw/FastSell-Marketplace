from rest_framework import serializers
from .models import Offer
from user_profiles.serializers import UserProfileSerializer

class OfferSerializer(serializers.ModelSerializer):
    owner = UserProfileSerializer()

    class Meta:
        model = Offer
        fields = ["id", "title", "price", "description", "owner"]
