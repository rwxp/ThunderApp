from django.db import models

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

class Bills(models.Model):
    billID = models.BigAutoField(primary_key=True)
    date = models.DateField()
    amount = models.BigIntegerField()
    status = models.CharField(max_length=24)
    idUser = models.ForeignKey(Users, on_delete=models.CASCADE)
    

class Admin(models.Model):
    id = models.OneToOneField(Users, primary_key=True, on_delete=models.CASCADE)


class Operadores(models.Model):
    id = models.OneToOneField(Users, primary_key=True, on_delete=models.CASCADE)

