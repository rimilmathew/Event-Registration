from rest_framework import serializers
from events.models import Event, User, Registration


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'password', 'created_at']

    def create(self, validated_data):
        user=User.objects.create_user(**validated_data)
        return user

class MyRegistrationSerializer(serializers.ModelSerializer):
    event = EventSerializer()
    class Meta:
        model = Registration
        fields = '__all__'