""" Thank you Stackoverflow: https://stackoverflow.com/questions/66504317/how-can-i-scrape-a-list-from-wikipedia-and-transfer-to-a-dataframe"""

import requests
from bs4 import BeautifulSoup
import pandas as pd
import json

url = 'https://en.wikipedia.org/wiki/List_of_people_from_New_York_City'
response = requests.get(url)
soup= BeautifulSoup(response.content, "html.parser")
data = [soup.find_all("div", {"class": "div-col"})[i].find_all("li") for i in range(27)]

new_data = []
for everyone in data:
    for singer in everyone:
        artist = str(singer)
        if 'singer' in artist:
            start = artist.index("title=") + 7
            end = artist.index('">')
            new_data.append(artist[start:end])
            print(artist[start:end])

new_york = {"New York City": new_data}
print(new_york)