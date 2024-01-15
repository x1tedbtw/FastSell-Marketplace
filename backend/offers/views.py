from rest_framework import generics
from .models import Offer
from .serializers import OfferSerializer

class OfferList(generics.ListCreateAPIView):
    queryset = Offer.objects.all()
    serializer_class = OfferSerializer

class OfferDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Offer.objects.all()
    serializer_class = OfferSerializer

"""
class OfferList(APIView):
    def get(self, request):
        offers = Offer.objects.all()
        serializer = OfferSerializer(offers)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = OfferSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class OfferDetail(APIView):
    def get_object(self, id):
        try:
            return Offer.objects.get(id=id)
        except Offer.DoesNotExist:
            raise Http404
    
    def get(self, request, id):
        offer = self.get_object(id)
        serializer = OfferSerializer(offer)
        return Response(serializer.data)

    def put(self, request, id):
        offer = self.get_object(id)
        serializer = OfferSerializer(offer, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, id):
        offer = self.get_object(id)
        offer.delete()
        return REsponse(status=status.HTTP_204_NO_CONTENT)
"""