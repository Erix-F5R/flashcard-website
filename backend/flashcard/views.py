from django.shortcuts import render
from rest_framework import viewsets
from .serializers import FlashcardSerializer
from .models import Flashcard

# Create your views here.

class FlashcardView(viewsets.ModelViewSet):
    serializer_class = FlashcardSerializer
    queryset = Flashcard.objects.all()

