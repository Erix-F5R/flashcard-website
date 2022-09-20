import json
from wiki_request import wiki_request

# Read data from file:
data = json.load( open( "dict.json" ) )

#Clear output
with open('deck.txt', 'w') as f:
    f.write('')

base = "https://fr.wiktionary.org"

for i in data:
        
    temp = wiki_request(i)
    with open('deck.txt', 'a') as f:
        s = i + ";" + temp[0] + "<br>" + temp[1] + "<br>" + f'<a href="{base}{data[i]}">{i}</a>' + "\n"
        f.write(s)
 



