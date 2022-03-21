from flask import Flask, request
from flask_pymongo import PyMongo
import re

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/musicMap"
mongodb_client = PyMongo(app)
db = mongodb_client.db

def cleanEachStringInArray(artists):
    result = []
    for artist in artists:
        result.append(re.sub("[\(\[].*?[\)\]]", "", artist))
    return result

@app.route('/get-artists-from-city/<city>', methods=["GET"])
def getArtistsFromCity(city):
    try:
        cities = db.city.find()
        new_york_artists = list(cities)[0][city]
        new_york_artists = cleanEachStringInArray(new_york_artists)
        return {"cities": new_york_artists}
    except:
        return "Not Found", 404

if __name__ == '__main__':
    app.run(debug=True)