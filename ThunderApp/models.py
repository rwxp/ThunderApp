from django.db import models

# Create your models here.

class Users(models.Model):
    id = models.AutoField(primary_key=True)
    lastName = models.CharField(max_length=62)
    firstName = models.CharField(max_length=62)
    birthDate = models.DateField()
    address = models.CharField(max_length=24)
    phone = models.CharField(max_length=24)
    role = models.CharField(max_length=24)
    isActive = models.BooleanField()