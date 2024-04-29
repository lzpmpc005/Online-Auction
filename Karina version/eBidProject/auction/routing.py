from django.urls import path
from .consumers import AuctionConsumer, OnlineUsers
from channels.routing import URLRouter

websocket_urlpatterns = URLRouter(
    [
        path("ws/auction/", AuctionConsumer.as_asgi()),
        path("ws/presence/<str:username>/", OnlineUsers.as_asgi()),
    ]
)
