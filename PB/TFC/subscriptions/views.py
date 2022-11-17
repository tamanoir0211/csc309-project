import datetime
from django.shortcuts import render
from subscriptions.models import Subscription
from rest_framework.exceptions import ValidationError
from rest_framework.generics import CreateAPIView
from User.models import PaymentInfo, Payment
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from dateutil.relativedelta import *

# Create your views here.


class SubscribeView(CreateAPIView):
    permission_classes = [IsAuthenticated]

    def post(self, request,  *args, **kwargs):
        user = request.user
        user_id = user.user_id

        if not Subscription.objects.filter(sub_id=self.kwargs['subs_id']).exists():
            raise ValidationError(
                {"Value Error": ["404 Not found"]})
        elif not user.subscription is None:
            content = {'error': 'user already has an active subscription'}
            return Response(content, status=status.HTTP_400_BAD_REQUEST)
        else:
            subscription = Subscription.objects.get(
                sub_id=self.kwargs['subs_id'])
            price = float(subscription.price)
            payment_frequency = int(subscription.length_months)
            payment_amount = price/payment_frequency

            # check if user has payment info set up
            if not PaymentInfo.objects.filter(user=user_id).exists():
                return Response({'Payment_info': 'payment info missing'})

            else:
                payment_info = PaymentInfo.objects.get(
                    user=user_id)
                payment = Payment(user=user, payment_info=payment_info,
                                  amount=payment_amount, subscription=subscription)
                payment.save()
                print(user.subscription)
                user.subscription = subscription
                num_months = subscription.length_months
                user.next_billing_date = datetime.date.today() + relativedelta(months=+num_months)
                user.save()
                print(user.subscription)
                content = {'success': 'successfully subscribed'}

                return Response(content, status=status.HTTP_200_OK)
