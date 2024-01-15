from django.urls import path
from rest_framework import serializers
from rest_framework.urlpatterns import format_suffix_patterns
from .models import UserProfile
from .serializers import UserProfileSerializer
from .views import UserProfileList, UserProfileDetail

urlpatterns = [
    path("", UserProfileList.as_view()),
    path("<int:pk>/", UserProfileDetail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
