from django.contrib import admin
from django.http import JsonResponse
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


def api_root(request):
    return JsonResponse({
        'service': 'Espress Travel Community API',
        'status': 'ok',
        'endpoints': {
            'cities': '/api/cities/',
            'posts': '/api/posts/',
            'register': '/api/auth/register/',
            'login': '/api/auth/login/',
            'me': '/api/auth/me/',
            'admin': '/admin/',
        },
    })


urlpatterns = [
    path('', api_root, name='api-root'),
    path('healthz/', lambda r: JsonResponse({'status': 'healthy'}), name='healthz'),
    path('admin/', admin.site.urls),
    path('api/auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/', include('forum.urls')),
]
