// 1. Initialiser la carte sur Casablanca
// [Latitude, Longitude], Zoom (13 est idéal pour une ville)
const map = L.map('map').setView([33.5731, -7.5898], 13);

// 2. Charger les images de la carte (OpenStreetMap - Gratuit)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// 3. Chercher les cafés à Casablanca via l'API Overpass (Gratuit)
function chargerCafes() {
    // Cette requête cherche les "amenity=cafe" dans la zone de Casablanca
    const query = `[out:json];node["amenity"="cafe"](33.55,-7.65,33.60,-7.50);out;`;
    const url = "https://overpass-api.de/api/interpreter?data=" + encodeURIComponent(query);

    fetch(url)
        .then(response => response.json())
        .then(data => {
            data.elements.forEach(cafe => {
                if (cafe.lat && cafe.lon) {
                    L.marker([cafe.lat, cafe.lon]).addTo(map)
                        .bindPopup(cafe.tags.name || "Café sans nom");
                }
            });
        })
        .catch(error => console.error("Erreur de chargement des cafés:", error));
}

// Lancer la recherche
chargerCafes();