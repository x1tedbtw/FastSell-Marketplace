from django.test import TestCase
from user_profiles.models import UserProfile
from .models import Offer

class OfferTestCase(TestCase):
    def setUp(self):
        self.owner = UserProfile.objects.create(username="L33tHacker$$", password="qwerty123")
    
    def test_create_offer(self):
        offer = Offer.objects.create(title="Prodam garazh", price=154.99, description="Cool garazh", owner=self.owner)

        self.assertEqual(Offer.objects.count(), 1)
        saved_offer = Offer.objects.first()
        
        self.assertEqual(saved_offer.title, "Prodam garazh")
        self.assertEqual(saved_offer.price, 154.99)
        self.assertEqual(saved_offer.description, "Cool garazh")
        self.assertEqual(saved_offer.owner, self.owner)
