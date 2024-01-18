from django.db import models
from user_profiles.models import UserProfile


class Category(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name


class Subcategory(models.Model):
    id = models.AutoField(primary_key=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

class OfferImage(models.Model):
    image = models.ImageField(upload_to='offer_images/', blank=True, null=True)


class Offer(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=255)
    subcategory = models.ForeignKey(Subcategory, on_delete=models.CASCADE)
    price = models.FloatField()
    description = models.TextField()
    owner = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    images = models.ManyToManyField(OfferImage, related_name="offers")



