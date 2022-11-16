from rest_framework import serializers
from .models import Studio, Location, StudioImages, StudioAmenities, ClassTime, Class, Coach, ClassBooking
from User.serializers import UserSerializer


class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = '__all__'


class StudioImagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudioImages
        fields = ['id', 'image']


class StudioAmenitiesSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudioAmenities
        fields = ['id', 'type', 'quantity']


class StudioSerializer(serializers.ModelSerializer):
    location = LocationSerializer()

    class Meta:
        model = Studio
        fields = ['name', 'location']


class StudioDetailSerializer(serializers.ModelSerializer):
    location = LocationSerializer()
    images = StudioImagesSerializer(source='studioimages_set', many=True)
    amenities = StudioAmenitiesSerializer(
        source='studioamenities_set', many=True)

    class Meta:
        model = Studio
        fields = ['name', 'phone_number', 'location', 'images', 'amenities']


class CoachSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coach
        fields = ['name']


class ClassSerializer(serializers.ModelSerializer):
    coach = CoachSerializer()

    class Meta:
        model = Class
        fields = ['name', 'description', 'capacity', 'coach']


class ClassScheduleSerializer(serializers.ModelSerializer):
    classes = ClassSerializer()

    class Meta:
        model = ClassTime
        fields = ['classes', 'time']


class ClassBookingSerializer(serializers.ModelSerializer):
    class_time = ClassScheduleSerializer()
    user = UserSerializer()

    class Meta:
        model = ClassBooking
        fields = ['class_time', 'user']
