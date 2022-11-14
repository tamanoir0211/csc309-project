from rest_framework import serializers
from .models import Studio, Location, StudioImages, StudioAmenities


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
    amenities = StudioAmenitiesSerializer(source='studioamenities_set', many=True)

    class Meta:
        model = Studio
        fields = ['name', 'phone_number', 'location', 'images', 'amenities']
