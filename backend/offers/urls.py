from django.urls import path
from .views import OfferList, OfferDetail
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path("", OfferList.as_view()),
    path("<int:pk>/", OfferDetail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
