from django.contrib import admin
from .models import Flashcard

class FlashcardAdmin(admin.ModelAdmin):
    list_display = ('word', 'gender', 'definition', 'link', 'correct_tally', 'incorrect_tally')

# Register your models here.

admin.site.register(Flashcard, FlashcardAdmin)