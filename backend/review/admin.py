"""Admin configuration for the food review app models."""
from django.contrib import admin
from .models import Restaurant, RestaurantReview

@admin.register(Restaurant)
class RestaurantAdmin(admin.ModelAdmin):
    """Admin configuration for Restaurant model."""
    list_display = ['id', 'name', 'location', 'overall_score', 'created_by', 'created_at']
    search_fields = ['name', 'location', 'created_by']
    readonly_fields = ['id', 'created_at']
    list_filter = ['created_at']

@admin.register(RestaurantReview)
class RestaurantReviewAdmin(admin.ModelAdmin):
    """Admin configuration for RestaurantReview model."""
    list_display = ['id', 'restaurant_id', 'reviewer_name', 'date']
    search_fields = ['reviewer_name', 'restaurant_id']
    readonly_fields = ['id', 'date']
    list_filter = ['date']
