from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as DjangoUserAdmin
from django.utils.translation import ugettext_lazy as _

from apps.users.models import User


class UserAdmin(DjangoUserAdmin):
    fieldsets = (
        (None, {'fields': ('id', 'email', 'password')}),
        (_('Personal info'), {
            'fields': (
                'name',
                'phone_number',
                'email_confirm',
                'type_user',
                'cpf'
            )
        }),
        (_('Permissions'), {'fields': (
            'is_active',
            'is_staff',
            'is_superuser',
            'share_phone',
            'groups',
            'user_permissions',
        )}),
        (_('Important dates'), {'fields': (
            'last_login',
            'date_joined',
        )}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'phone_number', 'password1', 'password2'),
        }),
    )
    list_display = ('email', 'name', 'cpf', 'is_active', )
    search_fields = ('email', 'name')
    ordering = ('-id',)
    list_filter = ('is_superuser', 'is_active')
    readonly_fields = ('date_joined', 'last_login', 'id')


admin.site.register(User, UserAdmin)

admin.site.site_header = 'Navigo :: Administração'
admin.site.index_title = 'Administração'
admin.site.site_title = 'Navigo'
