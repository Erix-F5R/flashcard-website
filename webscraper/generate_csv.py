import csv
import re

header = ['word','gender','definition','link','correct_tally','incorrect_tally']
db = []
db.append(header)

errors = []

i = 0
with open('deck.txt', newline='') as csvfile:
	deckreader = csv.reader(csvfile, delimiter=';')
	for row in deckreader:
		if len(row) == 3:
			temp = []
			temp.append(row[0])
			temp.append(row[1]+row[2])
			row = temp
		newline = []
		try:
			newline.append(row[0])
			newline.append(row[1][0])
			newline.append(row[1].split('<br>')[1])
			newline.append(row[1].split('<br>')[2].split('"')[1])
			newline.append('0')
			newline.append('0')
		except:
			errors.append(row)

		
		db.append(newline)
		
	print(db)


with open('deck.csv', 'w', newline='') as csvfile:
	deckwriter = csv.writer(csvfile, delimiter=';')
	for row in db:
		deckwriter.writerow(row)