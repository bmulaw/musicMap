from flask import Flask, request
from flask_pymongo import PyMongo

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/musicMap"
mongodb_client = PyMongo(app)
db = mongodb_client.db

@app.route('/getArtistsFromCity/<city>', methods=["GET"])
def getArtistsFromCity(city):
    cities = db.find()
    return cities[city]

if __name__ == '__main__':
    app.run(debug=True)