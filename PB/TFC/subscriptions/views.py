from django.shortcuts import render
from subscriptions.models import Subscription
from rest_framework.exceptions import ValidationError
from rest_framework.generics import CreateAPIView
from User.models import PaymentInfo, Payment

# Create your views here.


class SubscribeView(CreateAPIView):

    def post(self, request):
        user = request.user
        user_id = user.id

        if not Subscription.objects.filter(sub_id=self.kwargs['sub_id']).exists:
            raise ValidationError(
                {"Value Error": ["404 Not found"]})
        else:
            user.subscription = self.kwargs['sub_id']
            payment_info = payment_info.objects.filter(user=user_id).id
            payment = Payment(user_id, payment_info, self.kwargs['sub_id'])
            payment.save()
