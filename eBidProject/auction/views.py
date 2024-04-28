from rest_framework import viewsets
from django.shortcuts import get_object_or_404
from .models import Item, Bid, Comment
from .serializers import ItemSerializer, BidSerializer, CommentSerializer
from django.contrib.auth.models import User
class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class BidViewSet(viewsets.ModelViewSet):
    queryset = Bid.objects.all()
    serializer_class = BidSerializer

    def perform_create(self, serializer):
        item = get_object_or_404(Item, pk=self.kwargs.get('item_pk'))
        serializer.save(bidder=self.request.user, item=item)

class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def perform_create(self, serializer):
        item = get_object_or_404(Item, pk=self.kwargs.get('item_pk'))
        serializer.save(author=self.request.user, item=item)
