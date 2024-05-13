from django.urls import path
from .consumers import OnlineUsers
from channels.routing import URLRouter

websocket_urlpatterns = URLRouter(
    [
        path("ws/presence/<str:username>/<str:listing_id>/", OnlineUsers.as_asgi()),
    ]
)
