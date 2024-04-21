from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import ListingSerializer


@api_view(["POST"])
def create_listing(request):
    serializer = ListingSerializer(data=request.data)
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
