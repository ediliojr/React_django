from rest_framework import serializers
from Usuarios.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields = '__all__'