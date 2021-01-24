from django.contrib import admin, messages
from django.utils.translation import ngettext
from apps.base.models import Institution, TypeInstitution, Contact


class TypeInstitutionAdmin(admin.ModelAdmin):
    list_display = ('name', )


class ContactAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'subject')


class InstitutionAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'owner', 'get_institution')
    actions = ['active_institution']

    def active_institution(self, request, queryset):
        for institution in queryset:
            institution.active_all()
        self.message_user(request, ngettext(
            '%d instituição foi ativada com sucesso.',
            '%d instituições foram ativadas com sucesso.',
            queryset.count(),
        ) % queryset.count(), messages.SUCCESS)

    active_institution.short_description = 'Ativar Instituições'

admin.site.register(Contact, ContactAdmin)
admin.site.register(TypeInstitution, TypeInstitutionAdmin)
admin.site.register(Institution, InstitutionAdmin)





