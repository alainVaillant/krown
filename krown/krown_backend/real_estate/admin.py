from django.contrib import admin
from .models import Property

@admin.register(Property)
class PropertyAdmin(admin.ModelAdmin):
    list_display = ('title', 'price', 'location', 'is_available', 'created_at')
    list_filter = ('is_available', 'location')
    search_fields = ('title', 'location')
