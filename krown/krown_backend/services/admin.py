from django.contrib import admin
from .models import Service, ServiceRequest

@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'created_at')
    list_filter = ('category',)
    search_fields = ('title', 'description')

@admin.register(ServiceRequest)
class ServiceRequestAdmin(admin.ModelAdmin):
    list_display = ('user', 'service', 'status', 'created_at')
    list_filter = ('status', 'service')
    search_fields = ('user__username', 'message')
