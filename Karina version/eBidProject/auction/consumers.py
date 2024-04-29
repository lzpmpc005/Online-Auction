from channels.generic.websocket import AsyncJsonWebsocketConsumer, WebsocketConsumer
import json


class AuctionConsumer(AsyncJsonWebsocketConsumer):
    async def connect(self):
        self.group_name = "auction_group"

        await self.channel_layer.group_add(self.group_name, self.channel_name)

        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.group_name, self.channel_name)

    async def receive_json(self, content, **kwargs):
        await self.channel_layer.group_send(
            self.group_name, {"type": "update_bids", "content": content}
        )

    async def update_bids(self, event):
        await self.send_json(event["content"])


class OnlineUsers(WebsocketConsumer):
    connections = []
    users_name = []

    def connect(self):
        self.accept()
        print(self.scope)
        self.user = self.scope["url_route"]["kwargs"]["username"]
        self.connections.append(self)
        self.users_name.append(self.user)
        self.update_indicator(msg="connected")

    def disconnect(self, close_code):
        self.update_indicator(msg="disconnected")
        self.connections.remove(self)
        return super().disconnect(close_code)

    def update_indicator(self, msg):
        for connection in self.connections:
            print(connection)
            connection.send(
                text_data=json.dumps(
                    {
                        "msg": f"{self.user} {msg}",
                        "online": f"{len(self.connections)}",
                        "users": self.users_name,
                    }
                )
            )
