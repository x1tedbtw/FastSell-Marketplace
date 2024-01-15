from django.db import models
from user_profiles.models import UserProfile

class Offer(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=255)
    price = models.FloatField()
    description = models.TextField()
    owner = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
