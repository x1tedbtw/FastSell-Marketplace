from rest_framework import generics, permissions
from .models import Offer, Category
from .serializers import OfferViewSerializer, OfferSerializer    
from .permissions import IsOwnerOrReadOnly


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
        category = self.request.query_params.get("category")

        if category is not None:
            queryset = queryset.filter(category=category)
        return queryset


class OfferDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Offer.objects.all()
    serializer_class = OfferSerializer
    permission_classes = [IsOwnerOrReadOnly]
