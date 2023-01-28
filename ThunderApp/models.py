from django.db import models
import datetime


# Create your models here.


class Users(models.Model):
    id = models.BigIntegerField(primary_key=True)
    lastName = models.CharField(max_length=62)
    firstName = models.CharField(max_length=62)
    birthDate = models.DateField()
    password = models.CharField(max_length=50)
    address = models.CharField(max_length=24)
    phone = models.CharField(max_length=24)
    role = models.CharField(max_length=24)
    isActive = models.BooleanField()

    def save(self, *args, **kwargs):
        super(Users, self).save(Bills.objects.create(
            billingDate = datetime.datetime.now() + datetime.timedelta(days=30),
            dueDate = datetime.datetime.now() + datetime.timedelta(days=30) + datetime.timedelta(days=10),
            amount=0,
            status="null",
            payMethod="null",
            userID=self.id,
            isGenerated=False))


class Bills(models.Model):
    userID = models.BigIntegerField()
    billID = models.BigAutoField(primary_key=True)
    billingDate = models.DateField()  # fecha de generación de la factura
    dueDate = models.DateField()  # fecha de vencimiento de la factura
    amount = models.BigIntegerField()
    status = models.CharField(max_length=24)
    payMethod = models.CharField(max_length=24)
    isGenerated = models.BooleanField(default=False)


    