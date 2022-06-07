from flashcard.models import Flashcard
import csv

header = True

with open('deck.csv') as f:
    reader = csv.reader(f, delimiter=';')
    for row in reader:
        if header:
            header = False
            continue
        fc = Flashcard(word=row[0],gender=row[1],definition=row[2],link=row[3], correct_tally=0, incorrect_tally =0 )
        fc.save()
        print(row)
