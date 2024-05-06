from django.urls import path
from .views import (
    create_listing,
    get_listings,
    get_listing,
    add_product,
    get_products,
    get_product,
    update_product,
    delete_product,
    update_listing,
    delete_listing,
    user_listings,
)

urlpatterns = [
    path("add_product/", add_product, name="add_product"),
    path("products/", get_products, name="get_products"),
    path("products/<int:pk>/", get_product, name="get_product"),
    path("products/<int:pk>/update/", update_product, name="update_product"),
    path("products/<int:pk>/delete/", delete_product, name="delete_product"),
    path("create/", create_listing, name="create_listing"),
    path("listings/", get_listings, name="get_listings"),
    path("listings/<int:pk>/", get_listing, name="get_listing"),
    path("listings/<int:pk>/update/", update_listing, name="update_listing"),
    path("listings/<int:pk>/delete/", delete_listing, name="delete_listing"),
    path("listings/user/<int:user_id>/", user_listings, name="user_listings"),
]
