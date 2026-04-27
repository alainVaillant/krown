from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.register if hasattr(admin.site, 'urls') else admin.site.urls), # Correction dynamique pour admin
    path('api/accounts/', include('accounts.urls')),
    path('api/services/', include('services.urls')),
    path('api/academy/', include('academy.urls')),
    path('api/real-estate/', include('real_estate.urls')),
    path('api/blog/', include('blog.urls')),
    path('api/mentorship/', include('mentorship.urls')),
    path('api/dashboard/', include('dashboard.urls')),
]

# Gestion de l'admin.site.urls de manière standard
from django.contrib import admin
urlpatterns[0] = path('admin/', admin.site.urls)

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
