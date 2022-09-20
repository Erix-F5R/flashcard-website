import requests
import json
from bs4 import BeautifulSoup

r=requests.get('https://fr.wiktionary.org/wiki/Wiktionnaire:Liste_de_1750_mots_fran%C3%A7ais_les_plus_courants')
htmlblock = BeautifulSoup(r.text, 'html.parser')

htmlblock = htmlblock.find_all('p')
noms_dict = {}

for result in htmlblock:
    if result.contents[0].name == 'b':
        if result.contents[0].contents[0] == 'Noms':
            for tag in result:
                if tag.name == 'a':
                    noms_dict[tag.contents[0]] = tag.attrs['href']



#Save dict to json
json.dump( noms_dict, open( "dict.json", 'w' ) )

# Read data from file:
#data = json.load( open( "dict.json" ) )
#for i in data:
#    print(i, data[i])