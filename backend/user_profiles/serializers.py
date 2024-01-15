from rest_framework import serializers
from .models import UserProfile

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ["username", "first_name", "last_name", "email", "password", "location", "phone_number"]
        extra_kwargs = {"password": {"write_only": True}}
