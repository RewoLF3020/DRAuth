from django.contrib import admin
from .models import Account


class AccountInline(admin.StackedInline):
    model = Account
    can_delete = False
    verbose_name_plural = "Account"

admin.site.register(Account)