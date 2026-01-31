"""Models for the review app."""
from django.utils import timezone
from django.db import models
from django_mongodb_backend.fields import ObjectIdAutoField, ArrayField

class Restaurant(models.Model):
    id = ObjectIdAutoField(primary_key=True, editable=False)
    name = models.CharField(max_length=255)
    description = models.TextField()
    location = models.CharField(max_length=255)
    images = ArrayField(models.CharField(max_length=255))
    created_by = models.CharField(max_length=255)
    created_at = models.DateTimeField(default=timezone.now)
    categories = ArrayField(models.CharField(max_length=255))
    overall_score = models.FloatField()
    food_type = models.CharField(max_length=255)
    status = models.CharField(max_length=50)

    class Meta:
        managed = False

class RestaurantReview(models.Model):
    id = ObjectIdAutoField(primary_key=True, editable=False)
    restaurant_id = models.CharField(max_length=255)
    images = ArrayField(models.CharField(max_length=255))
    reviewer_name = models.CharField(max_length=255)
    categories_score = ArrayField(models.CharField(max_length=255))
    review = models.TextField(blank=True, null=True)
    date = models.DateTimeField(default=timezone.now)

    class Meta:
        managed = False
