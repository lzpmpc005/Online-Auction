from rest_framework import serializers
from .models import Listing, Product


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"


class ListingSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)

    class Meta:
        model = Listing
        fields = "__all__"


class CreateListingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Listing
        fields = "__all__"
