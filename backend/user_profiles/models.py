from django.db import models
from django.contrib.auth.models import AbstractUser


class Location(models.Model):
    id = models.AutoField(primary_key=True)
    city = models.CharField(max_length=50, unique=True)


class UserProfile(AbstractUser):
    location = models.ForeignKey(Location, on_delete=models.CASCADE)
    phone_number = models.CharField(max_length=15, null=True, blank=True)
