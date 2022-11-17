from django.shortcuts import render
from .models import User
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from .serializers import UserSerializer, PaymentInfoSerializer
from rest_framework.authtoken.models import Token
from rest_framework.generics import ListAPIView, CreateAPIView
from studios.serializers import ClassSerializer, ClassScheduleSerializer
from studios.models import ClassBooking, ClassTime, Class

# Create your views here.


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
            token = Token.objects.get(user=user).key
            data['token'] = token
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
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            data = dict()
            data['response'] = "successfully updated user"
            data['email'] = serializer.data['email']
            return Response(data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes((IsAuthenticated,))
def create_payment_info(request):
    if request.method == 'POST':
        user = request.user
        serializer = PaymentInfoSerializer(
            data=request.data, context={'user': user})
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
            classes = classes | ClassTime.objects.filter(
                id=class_time_id)

        return classes.order_by("time")


class UnsubscribeView(CreateAPIView):
    permission_classes = [IsAuthenticated]

    def post(self, request,  *args, **kwargs):
        user = request.user
        if user.subscription is None:
            content = {'failed': 'no current subscriptions'}
            return Response(content, status=status.HTTP_400_BAD_REQUEST)
        else:
            user.subscription = None
            content = {'success': 'successfully unsubscribed'}
            return Response(content, status=status.HTTP_200_OK)
