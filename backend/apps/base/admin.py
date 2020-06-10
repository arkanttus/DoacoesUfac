from django.contrib import admin
from apps.base.models import Institution, TypeInstitution, Contact


class TypeInstitutionAdmin(admin.ModelAdmin):
    list_display = ('name', )


class InstitutionAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'owner', 'get_institution')


class ContactAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'subject')


admin.site.register(Contact, ContactAdmin)
admin.site.register(TypeInstitution, TypeInstitutionAdmin)
admin.site.register(Institution, InstitutionAdmin)





