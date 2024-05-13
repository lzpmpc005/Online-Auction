from channels.generic.websocket import AsyncJsonWebsocketConsumer, WebsocketConsumer
from .models import Listing, Bid
from django.contrib.auth.models import User
import json


class OnlineUsers(WebsocketConsumer):
    connections = []
    users_name = set()

    def connect(self):
        self.accept()
        self.listing_id = self.scope["url_route"]["kwargs"]["listing_id"]
        self.user = self.scope["url_route"]["kwargs"]["username"]
        self.current_price = Listing.objects.get(id=self.listing_id).current_price
        if self.user != "null":
            self.users_name.add(self.user)
        self.connections.append(self)
        self.update_indicator(msg="connected")

    def disconnect(self, close_code):
        self.users_name.remove(self.user)
        self.connections.remove(self)
        self.update_indicator(msg="disconnected")
        return super().disconnect(close_code)

    def update_indicator(self, msg):
        bids_list = list(
            [str(bid) for bid in Bid.objects.filter(listing=self.listing_id)]
        )
        for connection in self.connections:
            connection.send(
                text_data=json.dumps(
                    {
                        "msg": f"{self.user} {msg}",
                        "online": f"{len(self.connections)}",
                        "users": list(self.users_name),
                        "all_bids": bids_list,
                        "current_price": f"{self.current_price}",
                    }
                )
            )

    # if customer wants to send a message
    def receive(self, text_data):
        data = json.loads(text_data)
        if data["action"] == "bid":
            listing_id = data["listing"]
            listing = Listing.objects.get(id=listing_id)
            amount = int(data["amount"])
            if listing.current_price >= amount:
                print("here")
                return
            user = User.objects.get(id=int(data["user"]))
            bid = Bid(
                listing=listing,
                bidder=user,
                price=amount,
            )
            listing.current_price = bid.price
            listing.save()

            bid.save()
            bids_list = list(
                [str(bid) for bid in Bid.objects.filter(listing=listing_id)]
            )
            for connection in self.connections:
                connection.send(
                    text_data=json.dumps(
                        {"current_price": f"{bid.price}", "all_bids": bids_list}
                    )
                )
