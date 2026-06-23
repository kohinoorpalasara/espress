from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    RegisterView, MeView,
    CityViewSet, PostViewSet,
    CommentCreateView, UserProfileView
)

router = DefaultRouter()
router.register(r'cities', CityViewSet, basename='city')
router.register(r'posts', PostViewSet, basename='post')

urlpatterns = [
    path('', include(router.urls)),
    path('auth/register/', RegisterView.as_view(), name='register'),
    path('auth/me/', MeView.as_view(), name='me'),
    path('comments/', CommentCreateView.as_view(), name='comment-create'),
    path('profiles/<int:pk>/', UserProfileView.as_view(), name='user-profile'),
]
