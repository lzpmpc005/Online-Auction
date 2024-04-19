from django.db import models
from django.contrib.auth.models import User
from django.contrib import admin
class Item(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description = models.TextField()
    start_price = models.DecimalField(max_digits=9, decimal_places=2)
    image = models.ImageField(upload_to='item_images/')
    created_at = models.DateTimeField(auto_now_add=True)

class Bid(models.Model):
    item = models.ForeignKey(Item, on_delete=models.CASCADE, related_name='bids')
    bidder = models.ForeignKey(User, on_delete=models.CASCADE)
    bid_amount = models.DecimalField(max_digits=9, decimal_places=2)
    bid_time = models.DateTimeField(auto_now_add=True)

@admin.register(Item)
class ItemAdmin(admin.ModelAdmin):
    list_display = ('title', 'owner', 'start_price', 'created_at')

@admin.register(Bid)
class BidAdmin(admin.ModelAdmin):
    list_display = ('bidder', 'item', 'bid_amount', 'bid_time')

