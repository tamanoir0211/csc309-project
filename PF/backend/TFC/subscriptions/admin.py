from django.contrib import admin
from subscriptions.models import Subscription


class SubscriptionsInline(admin.TabularInline):
    model = Subscription


# Register your models here.

admin.site.register(Subscription)
