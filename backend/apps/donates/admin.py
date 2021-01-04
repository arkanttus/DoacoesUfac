from django.contrib import admin
from apps.donates.models import Donate


class DonateAdmin(admin.ModelAdmin):
    list_display = ('donator', 'institution', 'donated')


admin.site.register(Donate, DonateAdmin)

