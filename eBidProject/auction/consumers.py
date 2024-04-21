from channels.generic.websocket import AsyncJsonWebsocketConsumer


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
