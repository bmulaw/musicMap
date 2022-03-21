import requests
from bs4 import BeautifulSoup
import pandas as pd
from flask import Flask
from flask_pymongo import PyMongo

# setting up database connection
app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/musicMap"
mongodb_client = PyMongo(app)
db = mongodb_client.db

def isSinger(person):
    isMusician = 'singer' in person or 'rapper' in person or 'band' in person
    hasRightFormat = "title=" in person and '">' in person
    return isMusician and hasRightFormat

def scrapeWikipedia():
    cities = ["New_York_City", "Los_Angeles", "Brooklyn", "Seattle", "Houston", "Detroit", "Philadelphia", "Nashville"]
    artist_map = {}
    for city in cities:
        url = 'https://en.wikipedia.org/wiki/List_of_people_from_' + str(city)
        response = requests.get(url)
        soup = BeautifulSoup(response.content, "html.parser")
        size = len(soup.find_all("div", {"class": "div-col"}))
        data = [soup.find_all("div", {"class": "div-col"})[i].find_all("li") for i in range(size)]
        artist_list = []
        for people in data:
            for str(person) in people:
                if isSinger(person):
                    start = person.index("title=") + 7
                    end = person.index('">')
                    artist_list.append(person[start:end])
        
        artist_map[city] = artist_list

        """
        example response for Brooklyn: 
        ['Aaliyah', 'Red Cafe', 'Jasmine Cephas Jones', 'Cheryl Clemons', 'Maino (rapper)', 
        'Melora Creager', 'Dana Dane', "Da'Vinchi", 'Mos Def', 'Neil Diamond', 
        'David Draiman', 'Erick Arc Elliott', 'The Epochs', 'Fabolous', 'Lyric (group)', 
        'Cristina Fontanelli', 'Fu-Schnickens', 'Deborah Gibson', 'Johnny Gioeli', 
        'Ben Goldwasser', 'Louise Gunning', 'Arlo Guthrie', 'GZA', 'Adelaide Hall', 
        'Richie Havens', 'Lena Horne', 'Cheryl James', 'Jay-Z', 'Jaz-O', 'Jeru the Damaja', 
        'Joey Badass', 'Just-Ice', 'KA (rapper)', 'Big Daddy Kane', 'Lainie Kazan', 
        'The Kid Gashi', 'Carole King', 'Talib Kweli', 'Abbe Lane', 'Cyndi Lauper', 
        'Steve Lawrence', 'Shulem Lemmer', "Lil' Kim", 'Lil Mama', 'MC Lyte', 'Barry Manilow', 
        'Constantine Maroulis', 'Angie Martinez', 'Masta Ace', 'Maxwell (musician)', 
        'Meechy Darko', 'Robert Merrill', 'Matthew Paul Miller', 'Stephanie Mills', 
        "Mr. Muthafuckin' eXquire", 'Uncle Murda', 'Harry Nilsson', 'The Notorious B.I.G.', 
        'O.C. (rapper)', "Ol' Dirty Bastard", 'Joell Ortiz', 'Eddie Rabbitt', 'Marky Ramone', 
        'Anthony Ramos (actor)', 'Lou Reed', 'Bebe Rexha', 'Buddy Rich', 'Rowdy Rebel', 
        'Brenda Russell', 'RZA', 'Saigon (rapper)', 'Evie Sands', 'Seymour Schwartzman', 
        'Raymond Scott', 'Neil Sedaka', 'Shabazz the Disciple', 'Bobby Shmurda', 
        'Beverly Sills', 'Justine Skye', 'Pop Smoke', 'DJ Spinderella', 'Peter Steele', 
        'Connie Stevens', 'David Stones', 'Barbra Streisand', 'Eric Stuart', 
        'Rachel Trachtenburg', 'Kathy Troccoli', 'Uncle Murda', 'Adam Yauch']
        """
                
    print(artist_map.keys())