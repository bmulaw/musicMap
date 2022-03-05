const {API_KEY} = require('./config.js');

mapboxgl.accessToken = API_KEY;
var map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/streets-v11'
});
