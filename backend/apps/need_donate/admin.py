from django.contrib import admin

from apps.need_donate.models import NeedDonate, TypeDonate


class TypeDonateAdmin(admin.ModelAdmin):
    list_display = ('name', 'is_active')


class NeedDonateAdmin(admin.ModelAdmin):
    list_display = ('institution', 'type_donate', 'is_active', 'owner')


admin.site.register(TypeDonate, TypeDonateAdmin)
admin.site.register(NeedDonate, NeedDonateAdmin)
