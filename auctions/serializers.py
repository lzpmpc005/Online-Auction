from rest_framework import serializers
from .models import Item, Bid
class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ['id', 'owner', 'title', 'description', 'start_price', 'image', 'created_at']

class BidSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bid
        fields = ['id', 'item', 'bidder', 'bid_amount', 'bid_time']
