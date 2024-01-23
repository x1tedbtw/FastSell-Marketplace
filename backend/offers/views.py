from rest_framework import generics, permissions
from .models import Offer, Category
from .serializers import OfferViewSerializer, OfferSerializer    
from .permissions import IsOwnerOrReadOnly
from rest_framework.permissions import SAFE_METHODS



class OfferListCreateAPIView(generics.ListCreateAPIView):
    queryset = Offer.objects.all()
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
    
    def get_serializer_class(self):
        if self.request.method == "POST":
            return OfferSerializer
        return OfferViewSerializer

    def get_queryset(self):
        queryset  = Offer.objects.all()
        category_name = self.request.query_params.get("category")

        if category_name is not None:
            queryset = queryset.filter(category__name=category_name)
        return queryset


class OfferDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Offer.objects.all()
    permission_classes = [IsOwnerOrReadOnly]

    def get_serializer_class(self):
        if self.request.method in SAFE_METHODS:
            return OfferViewSerializer
        return OfferSerializer
