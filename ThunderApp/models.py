from django.db import models


# Create your models here.


class Users(models.Model):
    id = models.BigIntegerField(primary_key=True)
    lastName = models.CharField(max_length=62, default="")
    firstName = models.CharField(max_length=62)
    birthDate = models.DateField()
    email = models.CharField(max_length=62, null=True)
    password = models.CharField(max_length=50)
    address = models.CharField(max_length=24)
    phone = models.CharField(max_length=24)
    role = models.CharField(max_length=24)
    isActive = models.BooleanField()


class Bills(models.Model):
    userID = models.BigIntegerField()
    billID = models.BigAutoField(primary_key=True)
    billingDate = models.DateField()  # fecha de generación de la factura
    dueDate = models.DateField()  # fecha de vencimiento de la factura
    amount = models.BigIntegerField()
    status = models.CharField(max_length=24)
    payMethod = models.CharField(max_length=24)
    isGenerated = models.BooleanField(default=False)
