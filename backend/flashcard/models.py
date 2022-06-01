from django.db import models

# Create your models here.
class Flashcard(models.Model):
    
    MASC = 'm'
    FEMME = 'f'
    GENDER_CHOICES = [(MASC,'Masculin'),(FEMME,'Féminin')]

    word = models.CharField(max_length=250)
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES)
    definition = models.TextField()
    link = models.URLField()
    correct_tally = models.IntegerField()
    incorrect_tally = models.IntegerField()

    def __str__(self):
        return self.word