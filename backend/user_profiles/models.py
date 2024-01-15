from django.db import models
from django.contrib.auth.models import AbstractUser

class UserProfile(AbstractUser):
    location = models.CharField(max_length=255, null=True, blank=True)
    phone_number = models.CharField(max_length=15, null=True, blank=True)
