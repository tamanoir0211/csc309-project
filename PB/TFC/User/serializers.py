from rest_framework import serializers
from .models import User, PaymentInfo


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'phone_number', 'password', 'avatar']
        extra_kwargs = {'password': {'write_only': True}}

    def save(self):
        user = User(
            email=self.validated_data['email'],
            first_name=self.validated_data['first_name'],
            last_name=self.validated_data['last_name'],
            phone_number=self.validated_data['phone_number'],
            avatar=self.validated_data['avatar']
        )

        password = self.validated_data['password']
        user.set_password(password)
        user.save()
        return user


class PaymentInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentInfo
        fields = ['card_number', 'expiry', 'cvv', 'postal_code']

    def save(self, **kwargs):
        payment_info = PaymentInfo(
            card_number=self.validated_data['card_number'],
            expiry=self.validated_data['expiry'],
            cvv=self.validated_data['cvv'],
            postal_code=self.validated_data['postal_code'],
            user=self.context['user']
        )
        payment_info.save()
        return payment_info
