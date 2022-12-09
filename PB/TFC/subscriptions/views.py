import datetime
from django.shortcuts import render
from subscriptions.models import Subscription
from studios.models import ClassBooking, ClassBookingArchive
from rest_framework.exceptions import ValidationError
from rest_framework.generics import CreateAPIView, ListAPIView
from User.models import PaymentInfo, Payment
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status
from django.db.models import Max
from dateutil.relativedelta import *
from .serializers import SubscriptionSerializer
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
            content = {'message': 'Subscription failed. User already has an active subscription.'}
            return Response(content, status=status.HTTP_400_BAD_REQUEST)
        else:
            subscription = Subscription.objects.get(sub_id=self.kwargs['subs_id'])
            price = float(subscription.price)
            payment_amount = price

            # check if user has payment info set up
            if not PaymentInfo.objects.filter(user=user_id).exists():
                return Response({'message': 'Subscription failed. Payment information must be set up first.'})
            else:
                #subscribe the user with payment info
                user_payment_info = PaymentInfo.objects.filter(user=user_id).values_list('payment_info_id').order_by('payment_info_id').last()[0]
                payment_info = PaymentInfo.objects.get(payment_info_id = user_payment_info)
                payment = Payment(user=user, payment_info=payment_info,
                                  amount=payment_amount, subscription=subscription)

                payment.save()
                print(user.subscription)
                user.subscription = subscription
                num_months = subscription.length_months
                user.next_billing_date = datetime.date.today() + relativedelta(months=+num_months)
                user.save()
                print(user.subscription)

                #if user has any classes lost due to unsubscription, add them back again

                classbooking_archives = ClassBookingArchive.objects.filter(user=user.user_id).values_list('id')
                for archive in classbooking_archives:
                    obj = ClassBookingArchive.objects.get(id=archive[0])
                    classbooking = ClassBooking(class_time = obj.class_time, user=obj.user)
                    classbooking.save()
                    obj.delete()

                content = {'message': 'Success. User subscribed'}

                return Response(content, status=status.HTTP_200_OK)


class SubscriptionView(ListAPIView):
    serializer_class = SubscriptionSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return Subscription.objects.all()

