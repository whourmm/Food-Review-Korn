import io
import os

import environ

import logging

logging.basicConfig(level=logging.DEBUG)


BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

DEBUG = False

env = environ.Env(
    SECRET_KEY=(str, os.getenv("SECRET_KEY")),
    DATABASE_URL=(str, os.getenv("DATABASE_URL")),
)

# Use local .env file in dev mode
if os.getenv("PYTHON_ENV") == "dev":
    DEBUG = True
    ALLOWED_HOSTS = os.getenv("ALLOWED_HOSTS").split(",")
    CSRF_TRUSTED_ORIGINS = os.getenv("CSRF_TRUSTED_ORIGINS").split(",")

else:
    raise Exception(
        "No local .env detected. No secrets found."
    )

SECRET_KEY = env("SECRET_KEY")

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "storages",
    # external apps
    'rest_framework',
    'rest_framework.authtoken',
    'corsheaders',
    'oauth2_provider',
    'drf_spectacular',
    # Internal apps
    'review'
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    "corsheaders.middleware.CorsMiddleware",
]

ROOT_URLCONF = "app.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

ASGI_APPLICATION = "app.asgi.application"

# Database
# Use django-environ to parse the connection string
DATABASES = {
    "default":{
        "ENGINE": "django_mongodb_backend",
        "NAME": "Cluster49155",
        "CLIENT": {
            "host": os.getenv("DB_CONNECTION_STRING"),
        }
    }
}

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

REST_FRAMEWORK = {
    'DEFAULT_SCHEMA_CLASS': 'drf_spectacular.openapi.AutoSchema',
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 10,
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
        # 'app.permissions.CustomPermission'
    ],
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'oauth2_provider.contrib.rest_framework.OAuth2Authentication',
        'rest_framework.authentication.TokenAuthentication',
    ],
}

SPECTACULAR_SETTINGS = {
    'TITLE': 'Food Review Korn API',
    'DESCRIPTION': 'Collection of endpoints for Food Review with Kaoyat and Penguin App',
    'VERSION': '0.0.1',
    'SERVE_INCLUDE_SCHEMA': False,
    'DISABLE_ERRORS': True,  # Disable error detection and error responses
    'SERVE_AUTHENTICATION': None,
    'IGNORED_AUTH_SCHEMAS': ['oauth2'], 
    'COMPONENT_SPLIT_REQUEST': True,
}

OAUTH2_PROVIDER = {
    'RESOURCE_SERVER_INTROSPECTION_URL':  os.environ.get('OAUTH_INTRO_URL'),
    'RESOURCE_SERVER_INTROSPECTION_CREDENTIALS': (
        os.environ.get('OAUTH_CLIENT_ID'),  os.environ.get('OAUTH_CLIENT_SECRET'))
}

# AUTH_USER_MODEL='users.CustomUser'

DJANGO_ENCRYPTED_FIELD_KEY = os.environ.get('ENV_DJANGO_ENCRYPTED_FIELD_KEY').encode()
DJANGO_ENCRYPTED_FIELD_ALGORITHM = os.environ.get('ENV_DJANGO_ENCRYPTED_FIELD_ALGORITHM')

RPC_KEY = os.environ.get('RPC_KEY')

#auto logout after 30 minutes
SESSION_COOKIE_AGE = 1800
