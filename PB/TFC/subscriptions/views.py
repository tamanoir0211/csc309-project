from django.shortcuts import render
from subscriptions.models import Subscription
from rest_framework.exceptions import ValidationError
from rest_framework.generics import CreateAPIView
from User.models import PaymentInfo, Payment
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

# Create your views here.


class SubscribeView(CreateAPIView):
    permission_classes = [IsAuthenticated]

    def post(self, request,  *args, **kwargs):
        user = request.user
        user_id = user.user_id

        if not Subscription.objects.filter(sub_id=self.kwargs['subs_id']).exists():
            raise ValidationError(
                {"Value Error": ["404 Not found"]})
        else:
            subscription = Subscription.objects.get(
                sub_id=self.kwargs['subs_id'])
            user.subscription = subscription
            price = subscription.price
            payment_frequency = subscription.length_months
            payment_amount = price/payment_frequency

            # check if user has payment info set up
            if not PaymentInfo.objects.filter(user=user_id).exists():
                return Response({'Payment_info': 'payment info missing'})

            else:
                payment_info = PaymentInfo.objects.filter(
                    user=user_id).payment_info_id
                payment = Payment(user_id, payment_info,
                                  payment_amount, self.kwargs['subs_id'])
                payment.save()
