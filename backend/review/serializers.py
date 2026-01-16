from rest_framework import serializers
from .models import Restaurant, RestaurantReview


class RestaurantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Restaurant
        fields = '__all__'


class RestaurantReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = RestaurantReview
        fields = '__all__'


class AddRestaurantSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=255)
    description = serializers.CharField(max_length=255)
    location = serializers.CharField(max_length=255)
    images = serializers.ListField(child=serializers.CharField())
    created_by = serializers.CharField(max_length=255)
    categories = serializers.ListField(child=serializers.DictField())
    overall_score = serializers.FloatField()
    food_type = serializers.CharField(max_length=255)


class ActiveUserResponseSerializer(serializers.Serializer):
    message = serializers.CharField()


class ErrorResponseSerializer(serializers.Serializer):
    detail = serializers.CharField()
