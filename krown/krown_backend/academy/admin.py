from django.contrib import admin
from .models import Course, Enrollment, Lesson

class LessonInline(admin.TabularInline):
    model = Lesson
    extra = 1

@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'price', 'created_at')
    list_filter = ('category',)
    inlines = [LessonInline]

@admin.register(Enrollment)
class EnrollmentAdmin(admin.ModelAdmin):
    list_display = ('user', 'course', 'progress', 'enrolled_at')
    list_filter = ('course',)

@admin.register(Lesson)
class LessonAdmin(admin.ModelAdmin):
    list_display = ('title', 'course', 'order')
    list_filter = ('course',)
