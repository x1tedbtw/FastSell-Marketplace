from django.urls import path
from rest_framework import serializers
from rest_framework.urlpatterns import format_suffix_patterns
from .models import UserProfile
from .serializers import UserProfileSerializer
from .views import UserProfileRegistrationAPIView, UserProfileLoginAPIView, UserProfileTokenAPIView, UserProfileDetailAPIView, MyUserProfileAPIView

urlpatterns = [
    path("register/", UserProfileRegistrationAPIView.as_view()),
    path("login/", UserProfileLoginAPIView.as_view()),
    path("tokens/<key>/", UserProfileTokenAPIView.as_view()),
    path("profiles/<int:pk>/", UserProfileDetailAPIView.as_view()),
    path("myprofile/", MyUserProfileAPIView.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
