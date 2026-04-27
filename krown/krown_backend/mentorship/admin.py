from django.contrib import admin
from .models import MentorshipProgram, MentorshipApplication

@admin.register(MentorshipProgram)
class MentorshipProgramAdmin(admin.ModelAdmin):
    list_display = ('title', 'duration', 'price')

@admin.register(MentorshipApplication)
class MentorshipApplicationAdmin(admin.ModelAdmin):
    list_display = ('user', 'program', 'status', 'created_at')
