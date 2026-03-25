let map;
let service;

function initMap() {
    // Coordinates for Casablanca
    const casablanca = { lat: 33.5731, lng: -7.5898 };

    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 14,
        center: casablanca,
    });

    const request = {
        location: casablanca,
        radius: '1000', // Search within 1km
        type: ['cafe']
    };

    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);
}

function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (let i = 0; i < results.length; i++) {
            createMarker(results[i]);
        }
    }
}

function createMarker(place) {
    new google.maps.Marker({
        map,
        position: place.geometry.location,
        title: place.name
    });
}