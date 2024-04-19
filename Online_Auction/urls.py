from django.urls import include, path
from rest_framework.routers import DefaultRouter
from auctions.views import ItemViewSet, BidViewSet
from django.contrib import admin


router = DefaultRouter()
router.register(r'items', ItemViewSet)
router.register(r'bids', BidViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
]
