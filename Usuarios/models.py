from django.db import models


# Create your models here.


class User(models.Model):
    UserId = models.AutoField(primary_key=True)
    UserNome = models.CharField(max_length=40)
    UserSobrenome = models.CharField(max_length=500)
    UserEmail = models.EmailField('Email',max_length=150)
    UserData_nascimento = models.DateField ('Data Nascimento', blank=True, null=True)
    UserData_cadastro = models.DateTimeField(auto_now_add=True, blank=True)


