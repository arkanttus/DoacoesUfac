from django.contrib import admin
from apps.base.models import Institution, TypeInstitution


class TypeInstitutionAdmin(admin.ModelAdmin):
    list_display = ('name', )


class InstitutionAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'owner', 'get_institution')


admin.site.register(TypeInstitution, TypeInstitutionAdmin)
admin.site.register(Institution, InstitutionAdmin)





