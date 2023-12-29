
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
    path('api/', include('authy.api_urls')),
    path("api/", include('server.urls')),
    path("api/", include('notification.urls')),
]
