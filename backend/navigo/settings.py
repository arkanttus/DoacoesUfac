import os
import environ


BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

env = environ.Env(
    # set casting, default value
    DEBUG=(bool, False)
)

environ.Env.read_env(env_file=os.path.join(BASE_DIR, '.env'))
PRODUCTION = True if env('SETTINGS') == 'PROD' else False

SECRET_KEY = env('SECRET_KEY')

GOOGLE_RECAPTCHA_SECRET_KEY = "6LfNRPUUAAAAAA_l4IEPhjqFexMqIbx_hKhAEvGX"

if PRODUCTION:
    ALLOWED_HOSTS = ['200.129.173.207', 'doacao.ufac.br', 'localhost']
else:
    ALLOWED_HOSTS = ['127.0.0.1', 'localhost']

DEBUG = True

DEFAULT_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    # 'django.contrib.sites',
]
THIRD_PARTY_APPS = [
    'rest_framework',
    'rest_framework.authtoken',
    'django_filters',
    'corsheaders',
    # 'drf_yasg',
    'localflavor',
]
LOCAL_APPS = [
    'apps.users',
    'apps.base',
    'apps.donates',
    'apps.need_donate'
]

INSTALLED_APPS = DEFAULT_APPS + THIRD_PARTY_APPS + LOCAL_APPS


MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'navigo.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates'), ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'navigo.wsgi.application'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': env('DB_NAME'),
        'USER': env('DB_USER'),
        'PASSWORD': env('DB_PASS'),
        'HOST': env('DB_HOST'),
        'PORT': '',
    }
}

AUTH_PASSWORD_VALIDATORS = []

AUTH_USER_MODEL = 'users.User'

LANGUAGE_CODE = 'pt-br'
TIME_ZONE = 'America/Rio_Branco'
USE_I18N = True
USE_L10N = True
USE_TZ = True

STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'static'),
]

# Production
if PRODUCTION:
    STATIC_URL = '/static/back/'
    MEDIA_URL = '/media/'
    STATIC_ROOT = '/var/www/static/navigo/'
    MEDIA_ROOT = '/var/www/media/navigo/'
else:
    # Dev
    STATIC_URL = '/static/'
    MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
    MEDIA_URL = '/media/'

REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny',
    ],
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.TokenAuthentication',
    ],
    'DEFAULT_RENDERER_CLASSES': [
        'rest_framework.renderers.JSONRenderer',
    ],
    'DEFAULT_FILTER_BACKENDS': [
        'django_filters.rest_framework.DjangoFilterBackend',
    ],
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.LimitOffsetPagination',
    'PAGE_SIZE': 20,
    'COERCE_DECIMAL_TO_STRING': False,
    'NON_FIELD_ERRORS_KEY': 'errors',
}

OLD_PASSWORD_FIELD_ENABLED = True

# CORS

CORS_ORIGIN_ALLOW_ALL = True
#CORS_ORIGIN_WHITELIST = [
#    'https://localhost:3000',
#]
#CORS_ORIGIN_REGEX_WHITELIST = [
#    'localhost:3000',
#]


EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_USE_TLS = True
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_HOST_USER = 'doacoesufac@gmail.com'
EMAIL_HOST_PASSWORD = 'remcyerwjpgxhfoz'
