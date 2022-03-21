const API_KEY = 'fakeAPIKey'
mapboxgl.accessToken = API_KEY

const success = (position) => {
    setMap([position.coords.longitude, position.coords.latitude])
}

const error = () => {setMap([-2.24, 53.48])}

navigator.geolocation.getCurrentPosition(success, error, 
                                        {enableHighAccuracy: true})

const setMap = (center) => {
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: center,
        zoom: 4
    });
    getCityFromCoordinates(center)
}

let place; 
const getCityFromCoordinates = (coordinates) => {
    const lon = coordinates[0]
    const lat = coordinates[1] 
    fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/
            ${lon},${lat}.json?access_token=${API_KEY}`)
        .then(res => res.json())
        .then(data => {
            place = data.features[3].place_name; 
            console.log(place)
        })
}



/* 


DATA RETURN OBJECT FOR GEOCODING


[
    {
        "id": "address.7331282402995334",
        "type": "Feature",
        "place_type": [
            "address"
        ],
        "relevance": 1,
        "properties": {
            "accuracy": "rooftop"
        },
        "text": "Park Drive",
        "place_name": "514a Park Drive, Boston, Massachusetts 02215, United States",
        "center": [
            -71.10619,
            42.34794
        ],
        "geometry": {
            "type": "Point",
            "coordinates": [
                -71.10619,
                42.34794
            ]
        },
        "address": "514a",
        "context": [
            {
                "id": "neighborhood.12087274502057780",
                "text": "Fenway"
            },
            {
                "id": "postcode.6377524108768220",
                "text": "02215"
            },
            {
                "id": "place.9454360526012190",
                "wikidata": "Q100",
                "text": "Boston"
            },
            {
                "id": "district.11510878044935260",
                "wikidata": "Q54072",
                "text": "Suffolk County"
            },
            {
                "id": "region.8307399429561540",
                "short_code": "US-MA",
                "wikidata": "Q771",
                "text": "Massachusetts"
            },
            {
                "id": "country.19678805456372290",
                "wikidata": "Q30",
                "short_code": "us",
                "text": "United States"
            }
        ]
    },
    {
        "id": "neighborhood.12087274502057780",
        "type": "Feature",
        "place_type": [
            "neighborhood"
        ],
        "relevance": 1,
        "properties": {},
        "text": "Fenway",
        "place_name": "Fenway, Boston, Massachusetts, United States",
        "bbox": [
            -71.110887376,
            42.335734502,
            -71.083260873,
            42.352183334
        ],
        "center": [
            -71.09,
            42.34
        ],
        "geometry": {
            "type": "Point",
            "coordinates": [
                -71.09,
                42.34
            ]
        },
        "context": [
            {
                "id": "postcode.6377524108768220",
                "text": "02215"
            },
            {
                "id": "place.9454360526012190",
                "wikidata": "Q100",
                "text": "Boston"
            },
            {
                "id": "district.11510878044935260",
                "wikidata": "Q54072",
                "text": "Suffolk County"
            },
            {
                "id": "region.8307399429561540",
                "short_code": "US-MA",
                "wikidata": "Q771",
                "text": "Massachusetts"
            },
            {
                "id": "country.19678805456372290",
                "wikidata": "Q30",
                "short_code": "us",
                "text": "United States"
            }
        ]
    },
    {
        "id": "postcode.6377524108768220",
        "type": "Feature",
        "place_type": [
            "postcode"
        ],
        "relevance": 1,
        "properties": {},
        "text": "02215",
        "place_name": "Boston, Massachusetts 02215, United States",
        "bbox": [
            -71.131071856,
            42.335585087,
            -71.085914111,
            42.355111986
        ],
        "center": [
            -71.1,
            42.35
        ],
        "geometry": {
            "type": "Point",
            "coordinates": [
                -71.1,
                42.35
            ]
        },
        "context": [
            {
                "id": "place.9454360526012190",
                "wikidata": "Q100",
                "text": "Boston"
            },
            {
                "id": "district.11510878044935260",
                "wikidata": "Q54072",
                "text": "Suffolk County"
            },
            {
                "id": "region.8307399429561540",
                "short_code": "US-MA",
                "wikidata": "Q771",
                "text": "Massachusetts"
            },
            {
                "id": "country.19678805456372290",
                "wikidata": "Q30",
                "short_code": "us",
                "text": "United States"
            }
        ]
    },
    {
        "id": "place.9454360526012190",
        "type": "Feature",
        "place_type": [
            "place"
        ],
        "relevance": 1,
        "properties": {
            "wikidata": "Q100"
        },
        "text": "Boston",
        "place_name": "Boston, Massachusetts, United States",
        "bbox": [
            -71.191155981,
            42.227925172,
            -70.986224049,
            42.396978995
        ],
        "center": [
            -71.0596,
            42.3605
        ],
        "geometry": {
            "type": "Point",
            "coordinates": [
                -71.0596,
                42.3605
            ]
        },
        "context": [
            {
                "id": "district.11510878044935260",
                "wikidata": "Q54072",
                "text": "Suffolk County"
            },
            {
                "id": "region.8307399429561540",
                "short_code": "US-MA",
                "wikidata": "Q771",
                "text": "Massachusetts"
            },
            {
                "id": "country.19678805456372290",
                "wikidata": "Q30",
                "short_code": "us",
                "text": "United States"
            }
        ]
    },
    {
        "id": "district.11510878044935260",
        "type": "Feature",
        "place_type": [
            "district"
        ],
        "relevance": 1,
        "properties": {
            "wikidata": "Q54072"
        },
        "text": "Suffolk County",
        "place_name": "Suffolk County, Massachusetts, United States",
        "bbox": [
            -71.191249,
            42.227926,
            -70.923859,
            42.450118
        ],
        "center": [
            -71.07349,
            42.33495
        ],
        "geometry": {
            "type": "Point",
            "coordinates": [
                -71.07349,
                42.33495
            ]
        },
        "context": [
            {
                "id": "region.8307399429561540",
                "short_code": "US-MA",
                "wikidata": "Q771",
                "text": "Massachusetts"
            },
            {
                "id": "country.19678805456372290",
                "wikidata": "Q30",
                "short_code": "us",
                "text": "United States"
            }
        ]
    },
    {
        "id": "region.8307399429561540",
        "type": "Feature",
        "place_type": [
            "region"
        ],
        "relevance": 1,
        "properties": {
            "short_code": "US-MA",
            "wikidata": "Q771"
        },
        "text": "Massachusetts",
        "place_name": "Massachusetts, United States",
        "bbox": [
            -73.5082109909611,
            41.1640411024653,
            -69.8290997013237,
            42.8867789765828
        ],
        "center": [
            -71.9603257607071,
            42.3204700602
        ],
        "geometry": {
            "type": "Point",
            "coordinates": [
                -71.9603257607071,
                42.3204700602
            ]
        },
        "context": [
            {
                "id": "country.19678805456372290",
                "wikidata": "Q30",
                "short_code": "us",
                "text": "United States"
            }
        ]
    },
    {
        "id": "country.19678805456372290",
        "type": "Feature",
        "place_type": [
            "country"
        ],
        "relevance": 1,
        "properties": {
            "wikidata": "Q30",
            "short_code": "us"
        },
        "text": "United States",
        "place_name": "United States",
        "bbox": [
            -179.9,
            18.8163608007951,
            -66.8847646185949,
            71.4202919997506
        ],
        "center": [
            -97.9222112121185,
            39.3812661305678
        ],
        "geometry": {
            "type": "Point",
            "coordinates": [
                -97.9222112121185,
                39.3812661305678
            ]
        }
    }
]

*/
