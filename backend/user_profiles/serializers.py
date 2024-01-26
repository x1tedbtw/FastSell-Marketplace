from rest_framework import serializers
from rest_framework.authtoken.models import Token
from .models import UserProfile, Location
from django.contrib.auth.hashers import make_password
from django.contrib.auth import authenticate


class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ["id", "city"]


""" TODO: Fix this fucking framework abomination """
class UserProfileRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    location = LocationSerializer()

    class Meta:
        model = UserProfile
        fields = ["id", "username", "first_name", "last_name", "phone_number", "email", "location", "password"]
    
    def validate(self, attrs):
        attrs["password"] = make_password(attrs["password"])
        return attrs


class UserProfileLoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True)

    def __init__(self, *args, **kwargs):
        super(UserProfileLoginSerializer, self).__init__(*args, **kwargs)
        self.user = None
    
    def validate(self, attrs):
        self.user = authenticate(username=attrs.get("username"), password=attrs.get("password"))
        if self.user:
            if not self.user.is_active:
                raise serializers.ValidationError("User account is disabled")
            return attrs
        else:
            raise serializers.ValidationError("Invalid credentials")


class UserProfileTokenSerializer(serializers.ModelSerializer):
    auth_token = serializers.CharField(source="key")

    class Meta:
        model = Token
        fields = ["auth_token", "created"]


class UserProfileSerializer(serializers.ModelSerializer):
    location = LocationSerializer()

    class Meta:
        model = UserProfile
        fields = ["id", "username", "first_name", "last_name", "email", "location", "phone_number"]
