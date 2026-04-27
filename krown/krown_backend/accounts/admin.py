from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User

class CustomUserAdmin(UserAdmin):
    model = User
    list_display = ['username', 'email', 'role', 'is_staff', 'created_at']
    fieldsets = UserAdmin.fieldsets + (
        ('Informations KROWN', {'fields': ('role', 'phone')}),
    )
    add_fieldsets = UserAdmin.add_fieldsets + (
        ('Informations KROWN', {'fields': ('role', 'phone', 'email')}),
    )

admin.site.register(User, CustomUserAdmin)
