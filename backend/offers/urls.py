from django.urls import path
from .views import OfferList, OfferDetail, CategoryList, SubcategoryDetail, SubcategoryList, SubcategoryDetail
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path("", OfferList.as_view()),
    path("<int:pk>/", OfferDetail.as_view()),
    path("categories/", CategoryList.as_view())
    path("categories/<int:category_pk>/subcategories/", SubcategoryList.as_view())
]

urlpatterns = format_suffix_patterns(urlpatterns)
