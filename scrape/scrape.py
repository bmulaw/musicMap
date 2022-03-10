""" Thank you Stackoverflow: https://stackoverflow.com/questions/66504317/how-can-i-scrape-a-list-from-wikipedia-and-transfer-to-a-dataframe"""

import requests
from bs4 import BeautifulSoup
import pandas as pd
import json

cities = ["New_York_City", "Los_Angeles", "Brooklyn", "Seattle", "Houston", "Detroit", "Philadelphia", "Nashville"]
artist_map = {}
for city in cities:
    url = 'https://en.wikipedia.org/wiki/List_of_people_from_' + str(city)
    response = requests.get(url)
    soup= BeautifulSoup(response.content, "html.parser")
    size = len(soup.find_all("div", {"class": "div-col"}))
    data = [soup.find_all("div", {"class": "div-col"})[i].find_all("li") for i in range(size)]
    new_data = []
    for people_array in data:
        for singer in people_array:
            singer = str(singer)
            if ('singer' in singer or 'rapper' in singer or 'band' in singer) and "title=" in singer and ('">' in singer):
                start = singer.index("title=") + 7
                end = singer.index('">')
                new_data.append(singer[start:end])
    artist_map[city] = new_data
            
print(artist_map.keys())