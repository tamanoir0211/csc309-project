import datetime
from rest_framework.exceptions import NotFound
from rest_framework.generics import RetrieveAPIView, ListAPIView, CreateAPIView
from rest_framework.permissions import AllowAny
from .models import Studio, ClassTime, Class, ClassBooking
from django.shortcuts import get_object_or_404
from .serializers import StudioSerializer, StudioDetailSerializer, ClassScheduleSerializer, ClassSerializer
from math import cos, asin, sqrt
from django.db.models import Case, When
from decimal import Decimal
from rest_framework.exceptions import ValidationError
from django.db.models import Q
from rest_framework.response import Response
from rest_framework import status


def distance(lat1, lon1, lat2, lon2):
    """function to calculate distance between two locations using
    latitude and longitude. It uses Haversine formula.
    """
    p = Decimal(0.017453292519943295)
    hav = 0.5 - cos((lat2-lat1)*p)/2 + cos(lat1*p) * \
        cos(lat2*p) * (1-cos((lon2-lon1)*p)) / 2
    return 12742 * asin(sqrt(hav))

# Create your views here.


class StudioListView(ListAPIView):
    serializer_class = StudioSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        input_lat = self.request.query_params.get('latitude')
        input_long = self.request.query_params.get('longitude')
        if not input_lat or not input_long:
            raise ValidationError(
                {"Param error": ["Wrong parameter name or missing value of parameter"]})
        try:
            float(input_lat)
            float(input_long)
        except ValueError:
            raise ValidationError(
                {"Value Error": ["Invalid latitude/longitude"]})

        if not (-90 <= float(input_lat) <= 90) or not (-180 <= float(input_long) <= 180):
            raise ValidationError(
                {"Value Error": ["Invalid latitude/longitude"]})

        # dict to store studio_id and distance between input location and corresponding studio location
        studio_distance = {}
        studios = Studio.objects.all()
        for studio in studios:
            studio_distance[studio.id] = distance(Decimal(input_lat), Decimal(
                input_long), studio.location.latitude, studio.location.longitude)

        # sort the distance in ascending order
        sorted_distance = {k: v for k, v in sorted(
            studio_distance.items(), key=lambda item: item[1])}
        id_list = list(sorted_distance.keys())
        closest_studio_first = Case(*[When(pk=pk, then=pos)
                                      for pos, pk in enumerate(id_list)])
        return Studio.objects.order_by(closest_studio_first)


class StudioDetailView(RetrieveAPIView):
    serializer_class = StudioDetailSerializer
    permission_classes = [AllowAny]

    def get_object(self):
        return get_object_or_404(Studio, id=self.kwargs['studio_id'])

    def retrieve(self, request, *args, **kwargs):
        response = super().retrieve(request, args, kwargs)
        lat = response.data.get('location').get('latitude')
        long = response.data.get('location').get('longitude')
        url_direction = 'https://www.google.com/maps/dir/?api=1&destination='+lat+'%2c'+long
        response.data['url_direction'] = url_direction
        return response


class ClassScheduleView(ListAPIView):
    serializer_class = ClassScheduleSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        if not Studio.objects.filter(id=self.kwargs.get('studio_id')):
            raise NotFound(
                detail='Studio with given studio_id does not exist.')
        classes = ClassTime.objects.filter(
            classes__studio_id=self.kwargs.get('studio_id'))
        print("classes")
        print(classes)
        if classes:
            classes = classes.filter(
                status=True, time__gte=datetime.datetime.now()).order_by('time')
        return classes


class StudioSearchFilterView(ListAPIView):
    serializer_class = StudioSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        studio_name = self.request.query_params.get('studio_name')
        amenity = self.request.query_params.get('amenity')
        class_name = self.request.query_params.get('class_name')
        coach = self.request.query_params.get('coach')
        custom_q = Q()
        if studio_name:
            custom_q = Q(name__icontains=studio_name)
        if amenity:
            custom_q &= Q(studioamenities__type__icontains=amenity)
        if class_name:
            custom_q &= Q(class__name__icontains=class_name)
        if coach:
            custom_q &= Q(class__coach__name__icontains=coach)

        return Studio.objects.filter(custom_q).distinct()


class ClassSearchFilterView(ListAPIView):
    serializer_class = ClassSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        class_name = self.request.query_params.get('class_name')
        coach_name = self.request.query_params.get('coach_name')
        date = self.request.query_params.get('date')
        time_start = self.request.query_params.get('time_start')
        time_end = self.request.query_params.get('time_end')

        custom_q = Q()
        if class_name:
            custom_q = Q(name__icontains=class_name)
        if coach_name:
            custom_q &= Q(coach__name__icontains=coach_name)
        if date:
            custom_q &= Q(range_date_start__lte=date,
                          range_date_end__gte=date)
        if time_start:
            custom_q &= Q(start_time__gte=time_start)
        if time_end:
            custom_q &= Q(end_time__lte=time_end)

        return Class.objects.filter(custom_q).distinct()


class ClassEnrollView(CreateAPIView):

    def post(self, request, *args, **kwargs):
        user = request.user

        # check if class and studio exist
        if not Class.objects.filter(studio=self.kwargs['studio_id'], id=self.kwargs['class_id']).exists():
            raise ValidationError(
                {"Value Error": ["404 Not found"]})

        else:
            # check class not started yet
            this_class = Class.objects.get(id=self.kwargs['class_id'])
            class_started = this_class.range_date_start < datetime.datetime.now().date()

            # check class is not full
            classtime = ClassTime.objects.get(classes=self.kwargs['class_id'])
            enrollment_count = ClassBooking.objects.filter(
                class_time=classtime.id).count()
            capacity_reached = enrollment_count >= this_class.capacity

            # check active subscription
            if class_started:
                content = {'class started': 'class already started'}
                return Response(content, status=status.HTTP_400_BAD_REQUEST)
            elif ClassBooking.objects.filter(class_time=classtime.id, user=user.user_id):
                content = {
                    'already booked': 'user already enrolled in this class'}
                return Response(content, status=status.HTTP_400_BAD_REQUEST)
            elif capacity_reached:
                content = {'capacity': 'class capacity reached'}
                return Response(content, status=status.HTTP_400_BAD_REQUEST)
            elif not user.subscription is None:
                content = {'subscription': 'user does not have a subscription'}
                return Response(content, status=status.HTTP_400_BAD_REQUEST)
            else:
                # create a new ClassBooking
                class_booking = ClassBooking(
                    class_time=classtime, user=user)
                class_booking.save()
                content = {'success': 'class booked'}
                return Response(content, status=status.HTTP_200_OK)


class ClassDropView(CreateAPIView):

    def post(self, request, *args, **kwargs):
        user = request.user

        # check if class and studio exist
        if not Class.objects.filter(studio=self.kwargs['studio_id'], id=self.kwargs['class_id']).exists():
            raise ValidationError(
                {"Value Error": ["404 Not found"]})
        else:
            class_time = ClassTime.objects.get(
                classes=self.kwargs['class_id'])
            if not ClassBooking.objects.filter(class_time=class_time.id).exists():
                raise ValidationError(
                    {"Value Error": ["404 Not found"]})
            else:

                class_booking = ClassBooking.objects.get(
                    class_time=class_time.id)
                class_booking.delete()
                content = {'success': 'class dropped'}
                return Response(content, status=status.HTTP_200_OK)
