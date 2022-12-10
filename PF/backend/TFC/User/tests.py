from django.test import TestCase
from models import User
# Create your tests here.


# Test for User model
class UserTestCase(TestCase):
    def setUp(self):
        user = User()
        user.create(first_name="John", last_name="Doe", avatar_path="path/to/avatar", phone_number="1234567890", email="test@test.ac", password="password")