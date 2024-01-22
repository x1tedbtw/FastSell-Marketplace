from django.urls import path
from .views import OfferListCreateAPIView, OfferDetailAPIView
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path("offers/", OfferListCreateAPIView.as_view()),
    path("offers/<int:pk>/", OfferDetailAPIView.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
