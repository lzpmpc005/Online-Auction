from channels.generic.websocket import AsyncWebsocketConsumer
import json

class BidConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = f'auction_{self.room_name}'

        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    # Receive message from WebSocket
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        bid = text_data_json['bid']

        # Send bid to room group
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'bid_message',
                'bid': bid
            }
        )

    # Receive message from room group
    async def bid_message(self, event):
        bid = event['bid']

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'bid': bid
        }))
