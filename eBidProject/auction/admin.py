
from django.contrib import admin
from .models import Item, Bid, Comment
@admin.register(Item)
class ItemAdmin(admin.ModelAdmin):
    list_display = ['name', 'description',  ]

    search_fields = ['name', 'description']
    list_per_page = 10

@admin.register(Bid)
class BidAdmin(admin.ModelAdmin):
    list_display = ['item', 'bid_amount', 'bid_time']
    search_fields = ['item', 'bidder']
    list_per_page = 10

@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ['item',  'content', 'timestamp']
    search_fields = ['item', 'author']
    list_per_page = 10



