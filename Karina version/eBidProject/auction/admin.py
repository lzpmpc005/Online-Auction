from django.contrib import admin

# Register your models here.
from .models import Listing, Product


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ("name", "description", "initial_price")
    list_filter = ("name", "description", "initial_price")
    search_fields = ("name", "description", "initial_price")


@admin.register(Listing)
class ListingAdmin(admin.ModelAdmin):
    list_display = ("product_name", "current_price", "start_time", "end_time")
    list_filter = ("product", "current_price", "start_time", "end_time")
    search_fields = ("product", "current_price", "start_time", "end_time")

    def product_name(self, obj):
        return obj.product.name

    product_name.short_description = "Product Name"
