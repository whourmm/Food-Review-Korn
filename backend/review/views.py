# pylint: disable=no-member, line-too-long, broad-exception-caught, import-error
""" view for food review endpoints """
from drf_spectacular.utils import extend_schema
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from .models import Restaurant, RestaurantReview
from .serializers import (
    RestaurantSerializer,
    RestaurantReviewSerializer,
    AddRestaurantSerializer,
    ActiveUserResponseSerializer,
    ErrorResponseSerializer,
)

class ActiveUserEndpoint(APIView):
    """test endpoint that requires an active user."""
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    @extend_schema(
        responses={
            200: ActiveUserResponseSerializer,
            403: ErrorResponseSerializer,
        },
        description="Simple endpoint to check if user is active.",
        summary="Check Active User"
    )
    def get(self, request):
        """Simple endpoint to check if user is active."""
        if not request.user.is_active:
            return Response({"detail": "User is not active."}, status=403)
        return Response({"message": "Hello, active user!"}, status=200)


class AddRestaurantEndpoint(APIView):
    """Endpoint to add restuarant"""
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    @extend_schema(
        request=AddRestaurantSerializer,
        responses={
            200: AddRestaurantSerializer,
            400: ErrorResponseSerializer,
        },
    )
    def post(self, request):
        serializer = AddRestaurantSerializer(data=request.data)
        if serializer.is_valid():
            restaurant = Restaurant.objects.create(
                name=serializer.validated_data['name'],
                description=serializer.validated_data['description'],
                location=serializer.validated_data['location'],
                images=serializer.validated_data['images'],
                created_by=serializer.validated_data['created_by'],
                categories=serializer.validated_data['categories'],
                overall_score=serializer.validated_data['overall_score'],
                food_type=serializer.validated_data['food_type']
            )
            response_serializer = RestaurantSerializer(restaurant)
            return Response(response_serializer.data, status=201)
        return Response(serializer.errors, status=400)


class CreateRestaurantReviewEndpoint(APIView):
    """Endpoint to create a restaurant review"""
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    @extend_schema(
        request=RestaurantReviewSerializer,
        responses={
            201: RestaurantReviewSerializer,
            400: ErrorResponseSerializer,
        },
    )
    def post(self, request):
        serializer = RestaurantReviewSerializer(data=request.data)
        if serializer.is_valid():
            review = RestaurantReview.objects.create(
                restaurant_id=serializer.validated_data['restaurant_id'],
                images=serializer.validated_data['images'],
                reviewer_name=serializer.validated_data['reviewer_name'],
                categories_score=serializer.validated_data['categories_score'],
                review=serializer.validated_data.get('review')
            )
            response_serializer = RestaurantReviewSerializer(review)
            return Response(response_serializer.data, status=201)
        return Response(serializer.errors, status=400)


class ListRestaurantsEndpoint(APIView):
    """Endpoint to list all restaurants"""

    @extend_schema(
        responses={
            200: RestaurantSerializer(many=True),
        },
    )
    def get(self, request):
        restaurants = Restaurant.objects.all()
        serializer = RestaurantSerializer(restaurants, many=True)
        return Response(serializer.data, status=200)
