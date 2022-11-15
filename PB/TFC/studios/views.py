import datetime

from rest_framework.generics import RetrieveAPIView, ListAPIView
from rest_framework.views import APIView
from .models import Studio, ClassTime
from django.shortcuts import get_object_or_404
from .serializers import StudioSerializer, StudioDetailSerializer, ClassScheduleSerializer
from math import cos, asin, sqrt
from django.db.models import Case, When
from decimal import Decimal
from rest_framework.exceptions import ValidationError


def distance(lat1, lon1, lat2, lon2):
    p = Decimal(0.017453292519943295)
    hav = 0.5 - cos((lat2-lat1)*p)/2 + cos(lat1*p) * \
        cos(lat2*p) * (1-cos((lon2-lon1)*p)) / 2
    return 12742 * asin(sqrt(hav))

# Create your views here.


class StudioListView(ListAPIView):
    serializer_class = StudioSerializer

    def get_queryset(self):
        input_lat = self.kwargs.get('latitude')
        input_long = self.kwargs.get('longitude')
        try:
            float(input_lat)
            float(input_long)
        except ValueError:
            raise ValidationError(
                {"Value Error": ["Invalid latitude/longitude"]})

        if not (-90 <= float(input_lat) <= 90) or not (-180 <= float(input_long) <= 180):
            raise ValidationError({"Value Error": ["Invalid latitude/longitude"]})

        studio_distance = {}
        studios = Studio.objects.all()
        for studio in studios:
            studio_distance[studio.id] = distance(Decimal(input_lat), Decimal(
                input_long), studio.location.latitude, studio.location.longitude)
        sorted_distance = {k: v for k, v in sorted(
            studio_distance.items(), key=lambda item: item[1])}
        id_list = list(sorted_distance.keys())
        shortest_dist = Case(*[When(pk=pk, then=pos)
                             for pos, pk in enumerate(id_list)])
        return Studio.objects.order_by(shortest_dist)


class StudioDetailView(RetrieveAPIView):
    serializer_class = StudioDetailSerializer

    def get_object(self):
        return get_object_or_404(Studio, id=self.kwargs['studio_id'])

    def retrieve(self, request, *args, **kwargs):
        response = super().retrieve(request, args, kwargs)
        lat = response.data.get('location').get('latitude')
        long = response.data.get('location').get('longitude')
        url_direction = 'https://www.google.com/maps/dir/?api=1&destination='+lat+'%2c'+long
        response.data['url_direction'] = url_direction
        return response

# class StudioSearchView(APIView):

#     def get(self, request, format=None):


class ClassScheduleView(ListAPIView):
    serializer_class = ClassScheduleSerializer

    def get_queryset(self):
        classes = ClassTime.objects.filter(classes=self.kwargs.get('studio_id'))
        if classes:
            classes = classes.filter(status=True, time__gte=datetime.datetime.now()).order_by('time')
        return classes
