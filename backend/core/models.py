from django.db import models
from enum import Enum

class Customer(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    birthDate = models.DateField(blank=True, null=True)
    province = models.CharField(max_length=100, blank=True, null=True)
    email = models.EmailField()
    password = models.CharField(max_length=100)


class City(Enum):

    LaPlata = "La Plata"
    Quilmes = "Quilmes"
    CABA = "CABA"
    Adrogue = "Adrogue"
    FlorencioVarela = "Florencio Varela"

    @classmethod
    def choices(cls):
        return [("", "Seleccione una ciudad")] + [(key.name, key.value) for key in cls]

class Seller(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    city = models.CharField(max_length=50, choices=City.choices(), default="")
    user = models.CharField(max_length=100, unique=True)
    password = models.CharField(max_length=100)
        

class Query(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.IntegerField()
    general_reason = models.TextField()
    city = models.CharField(max_length=50, choices=City.choices(), default="")
    Customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name="consultas", null=True, blank=True)
    assigned_seller = models.ForeignKey(Seller, on_delete=models.SET_NULL, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
