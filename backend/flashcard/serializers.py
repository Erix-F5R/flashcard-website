from rest_framework import serializers
from .models import Flashcard

class FlashcardSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Flashcard
        fields = ('id', 'word', 'gender', 'definition', 'link', 'correct_tally', 'incorrect_tally')