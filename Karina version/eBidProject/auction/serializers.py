from rest_framework import serializers
from .models import Listing, Product


class ProductSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(max_length=None, use_url=True)

    class Meta:
        model = Product
        fields = ["id", "name", "description", "initial_price", "image"]

    def get_photo_url(self, obj):
        request = self.context.get("request")
        photo_url = obj.fingerprint.url
        return request.build_absolute_uri(photo_url)


class ListingSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)

    class Meta:
        model = Listing
        fields = "__all__"


class CreateListingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Listing
        fields = "__all__"
