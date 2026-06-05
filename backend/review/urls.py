""""URL configurations for the RAI app."""
from django.urls import path
from .views import (
    ActiveUserEndpoint,
    AddRestaurantEndpoint,
    CreateRestaurantReviewEndpoint,
    ListRestaurantsEndpoint,
    RestaurantDetailEndpoint,
    ListReviewsByRestaurantEndpoint,
)

urlpatterns = [
    path('active-user/', ActiveUserEndpoint.as_view(), name='active-user-endpoint'),
    path('add-restaurant/', AddRestaurantEndpoint.as_view(), name='add-restaurant-endpoint'),
    path('create-review/', CreateRestaurantReviewEndpoint.as_view(), name='create-review-endpoint'),
    path('restaurants/', ListRestaurantsEndpoint.as_view(), name='list-restaurants-endpoint'),
    path('restaurants/<str:pk>/', RestaurantDetailEndpoint.as_view(), name='restaurant-detail-endpoint'),
    path('reviews/', ListReviewsByRestaurantEndpoint.as_view(), name='list-reviews-endpoint'),
]
