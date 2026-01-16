"""Models for the RAI app."""
import uuid
from django.db import models

class Restaurant(models.Model):
    id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False
    )
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    images = models.JSONField()
    created_by = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    categories = models.JSONField()
    overall_score = models.FloatField()
    food_type = models.CharField(max_length=255)

    class Meta:
        managed = False  # IMPORTANT


class RestaurantReview(models.Model):
    id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False
    )
    restaurant_id = models.UUIDField()
    images = models.JSONField()
    reviewer_name = models.CharField(max_length=255)
    categories_score = models.JSONField()
    review = models.TextField(blank=True, null=True)
    date = models.DateTimeField(auto_now_add=True)

    class Meta:
        managed = False  # IMPORTANT
