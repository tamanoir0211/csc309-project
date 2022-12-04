from datetime import datetime
from django.shortcuts import render
from .models import User, Payment
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from .serializers import UserSerializer, PaymentInfoSerializer, PaymentSerializer
from rest_framework.authtoken.models import Token
from rest_framework.generics import ListAPIView, CreateAPIView
from studios.serializers import ClassSerializer, ClassScheduleSerializer
from studios.models import ClassBooking, ClassTime, Class


@api_view(['POST'])
@permission_classes((AllowAny,))
def user_create(request):
    if request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            data = dict()
            data['response'] = "successfully created user"
            data['email'] = serializer.data['email']
            return Response(data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes((AllowAny,))
def user_login(request):
    if request.method == 'POST':
        email = request.data['email']
        password = request.data['password']
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            data = dict()
            data['response'] = "user does not exist"
            return Response(data, status=status.HTTP_400_BAD_REQUEST)
        if user.check_password(password):
            data = dict()
            data['response'] = "successfully logged in"
            data['email'] = user.email
            try:
                token = Token.objects.get(user=user)
            except Token.DoesNotExist:
                token = Token.objects.create(user=user)
            data['token'] = token.key
            return Response(data, status=status.HTTP_200_OK)
        data = dict()
        data['response'] = "incorrect password"
        return Response(data, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def user_profile(request):
    if request.method == 'GET':
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data)


@api_view(['POST'])
@permission_classes((IsAuthenticated,))
def user_logout(request):
    if request.method == 'POST':
        request.user.auth_token.delete()
        return Response(status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes((IsAuthenticated,))
def user_update(request):
    if request.method == 'POST':
        user = request.user

        if 'first_name' in request.data:
            user.first_name = request.data['first_name']

        if 'last_name' in request.data:
            user.last_name = request.data['last_name']

        if 'phone_number' in request.data:
            user.phone_number = request.data['phone_number']

        if 'avatar' in request.data:
            user.avatar = request.data['avatar']

        if 'password' in request.data:
            user.set_password(request.data['password'])
        try:
            user.save()
        except Exception as e:
            data = dict()
            data['response'] = "failed to update user"
            return Response(data, status=status.HTTP_400_BAD_REQUEST)
        return Response(status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes((IsAuthenticated,))
def create_payment_info(request):
    if request.method == 'POST':
        user = request.user
        serializer = PaymentInfoSerializer(data=request.data, context={'user': user})
        if serializer.is_valid():
            serializer.save()
            data = dict()
            data['response'] = "successfully created payment info"
            return Response(data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserClassView(ListAPIView):
    serializer_class = ClassScheduleSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        classes = ClassTime.objects.none()

        class_bookings = ClassBooking.objects.filter(
            user=user.user_id).values_list('class_time', flat=True)
        for class_time_id in class_bookings:
            classes = classes | ClassTime.objects.filter(id=class_time_id)


        return classes


class UnsubscribeView(CreateAPIView):
    permission_classes = [IsAuthenticated]

    def post(self, request,  *args, **kwargs):
        user = request.user
        if user.subscription is None:
            content = {'failed': 'no current subscriptions'}
            return Response(content, status=status.HTTP_400_BAD_REQUEST)
        else:
            user.subscription = None
            user.next_billing_date = None
            user.save()
            content = {'success': 'successfully unsubscribed'}
            return Response(content, status=status.HTTP_200_OK)

            #move bookings to archive and delete bookings
            classbookings = ClassBooking.objects.filter(user=user.user_id).values_list('id')
            for classbooking in classbookings:
                obj = ClassBooking.objects.get(id=classbooking)
                if ClassTime.objects.filter(id=obj.class_time).end_time.replace(tzinfo=None) > datetime.datetime.now().replace(tzinfo=None):
                    classbooking_archive = ClassBookingArchive(class_time = obj.class_time, user=classbooking.user)
                    classbooking_archive.save()
                    obj.delete()




class PaymentHistoryView(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = PaymentSerializer

    def get_queryset(self):
        user = self.request.user
        return Payment.objects.filter(user=user.user_id)