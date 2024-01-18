from rest_framework import generics, permissions
from .models import Offer, Category
from .serializers import OfferViewSerializer, OfferSerializer, CategorySerializer    
from .permissions import IsOwnerOrReadOnly


class CategoryListAPIView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = []


class OfferListCreateAPIView(generics.ListCreateAPIView):
    queryset = Offer.objects.all()
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
    
    def get_serializer_class(self):
        if self.request.method == "POST":
            return OfferSerializer
        return OfferViewSerializer


class OfferDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Offer.objects.all()
    serializer_class = OfferSerializer
    permission_classes = [IsOwnerOrReadOnly]
