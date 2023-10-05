from django.db import models
from django.conf import settings


class Account(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    name = models.CharField("name", max_length=255)

    def __str__(self):
        return self.user.email