from django.test import TestCase
from .models import UserProfile

class UserProfileTestCase(TestCase):
    def test_create_user_profile(self):
        profile = UserProfile.objects.create(
            username="testprofile",
            password="testpassword",
            first_name="Vanka",
            last_name="Vstanka",
            phone_number="+48111222333",
            location="Czornobajiwka"
        )

        self.assertEqual(UserProfile.objects.count(), 1)
        saved_profile = UserProfile.objects.first()
        
        self.assertEqual(saved_profile.username, "testprofile")
        self.assertEqual(saved_profile.password, "testpassword")
        self.assertEqual(saved_profile.first_name, "Vanka")
        self.assertEqual(saved_profile.last_name, "Vstanka")
        self.assertEqual(saved_profile.phone_number, "+48111222333")
        self.assertEqual(saved_profile.location, "Czornobajiwka")
