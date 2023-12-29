from rest_framework import serializers
from .models import Message
from authy.serializers import UserSerializer

class chatSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        models = Message
        fields = '__all__'
        