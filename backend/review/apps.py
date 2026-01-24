"""Configuration for the food review application."""
from django.apps import AppConfig
from django.contrib.admin.apps import AdminConfig
from django.contrib.auth.apps import AuthConfig
from django.contrib.contenttypes.apps import ContentTypesConfig


class MongoAdminConfig(AdminConfig):
    default_auto_field = "django_mongodb_backend.fields.ObjectIdAutoField"


class MongoAuthConfig(AuthConfig):
    default_auto_field = "django_mongodb_backend.fields.ObjectIdAutoField"


class MongoContentTypesConfig(ContentTypesConfig):
    default_auto_field = "django_mongodb_backend.fields.ObjectIdAutoField"


class ReviewConfig(AppConfig):
    """Configuration for the food review application."""
    default_auto_field = "django_mongodb_backend.fields.ObjectIdAutoField"
    name = 'review'
