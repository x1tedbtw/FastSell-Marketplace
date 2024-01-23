from django.db import models
from user_profiles.models import UserProfile


class Category(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name


class Offer(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=255)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True)
    price = models.FloatField()
    description = models.TextField()
    owner = models.ForeignKey(UserProfile, on_delete=models.CASCADE)


class OfferImage(models.Model):
    id = models.AutoField(primary_key=True)
    image = models.ImageField(upload_to='/')
    offer = models.ForeignKey(Offer, related_name="images", on_delete=models.CASCADE)
