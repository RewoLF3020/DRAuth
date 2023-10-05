from django.dispatch import receiver
from djoser.signals import user_activated
from accounts.models import Account


@receiver(user_activated)
def create_profile(request, user, **kwargs):
    Account.objects.create(user=user)