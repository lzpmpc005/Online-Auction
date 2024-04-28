from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ItemViewSet, BidViewSet, CommentViewSet
from channels.routing import ProtocolTypeRouter, URLRouter
from .consumers import BidConsumer

router = DefaultRouter()
router.register(r'items', ItemViewSet)
router.register(r'bids', BidViewSet)
router.register(r'comments', CommentViewSet)

websocket_urlpatterns = [
    path('ws/auction/<int:item_id>/', BidConsumer.as_asgi()),
]

urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
