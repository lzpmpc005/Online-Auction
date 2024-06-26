from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import Listing, Product
from .serializers import ListingSerializer, ProductSerializer, CreateListingSerializer


@api_view((["POST"]))
@permission_classes([IsAuthenticated])
def add_product(request):
    serializer = ProductSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
def get_products(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def get_product(request, pk):
    product = Product.objects.get(pk=pk)
    serializer = ProductSerializer(product)
    return Response(serializer.data)


@api_view(["UPDATE"])
@permission_classes([IsAuthenticated])
def update_product(request, pk):
    product = Product.objects.get(pk=pk)
    serializer = ProductSerializer(product, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_product(request, pk):
    product = Product.objects.get(pk=pk)
    product.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_listing(request):
    serializer = CreateListingSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
def get_listings(request):
    listings = Listing.objects.all()
    serializer = ListingSerializer(listings, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def get_listing(request, pk):
    listing = Listing.objects.get(pk=pk)
    serializer = ListingSerializer(listing)
    return Response(serializer.data)


@api_view(["UPDATE"])
@permission_classes([IsAuthenticated])
def update_listing(request, pk):
    listing = Listing.objects.get(pk=pk)
    serializer = ListingSerializer(listing, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# if user delete listing it will be deleted and product will be deleted
@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_listing(request, pk):
    listing = Listing.objects.get(pk=pk)
    product = listing.product
    product.delete()
    listing.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def user_listings(request, user_id):
    listings = Listing.objects.prefetch_related("product").filter(seller=user_id)
    serializer = ListingSerializer(listings, many=True)
    return Response(serializer.data)
