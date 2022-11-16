from django.shortcuts import render
from .models import User
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from .serializers import UserSerializer
from rest_framework.authtoken.models import Token

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
