from django.contrib import admin
from django.urls import path, include
# from rest_framework_nested import routers
from rest_framework import routers, urls
from apps.users.api.viewsets import UserView, Login, LogoutView
from apps.donates.views import DonateView
from apps.need_donate.views import NeedDonateView, TypeDonateView
from apps.base.api.viewsets import InstitutionView, TypeInstitutionView

router = routers.DefaultRouter()
router.register(r'users', UserView, basename='UserApp')
router.register(r'donates', DonateView, basename='DonateApp')
router.register(r'need_donates', NeedDonateView, basename='NeedDonateApp')
router.register(r'type_donates', TypeDonateView, basename='TypeDonateApp')
router.register(r'institutions', InstitutionView, basename='InstitutionApp')
router.register(r'type_institutions', TypeInstitutionView, basename='TypeInstitutionApp')


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include(router.urls)),
    path('api/v1/login/', Login.as_view(), name='obter-token'),
    path('api/v1/logout/', LogoutView.as_view(), name='logout'),
]
