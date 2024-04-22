from django.urls import include, path
from rest_framework.routers import DefaultRouter
from auctions.views import ItemViewSet, BidViewSet
from django.contrib import admin
from django.views.generic import TemplateView

router = DefaultRouter()
router.register(r'items', ItemViewSet)
router.register(r'bids', BidViewSet)

# API的URL模式
api_urlpatterns = [
    path('', include(router.urls)),

]

# 其他URL模式（如admin等）
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(api_urlpatterns)),

]