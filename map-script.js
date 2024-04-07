var map = L.map('map').setView([45.4702,9.1859], 12);
/*
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
*/

L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	subdomains: 'abcd',
	maxZoom: 20
}).addTo(map);

let incidenti;
let popup = L.popup();

d3.csv("./data/incidenti_milano.csv")
.then(function(data) {
    incidenti = data;
    
    for (i = 0; i < incidenti.length - 1; i++) {

        let place = incidenti[i]["Luogo (se in corsivo il luogo è indicativo)"]
        let latLon = place.split(",").map((x) => +x)

        let color;
        let fillColor;
        let radius;

        switch (incidenti[i]["Mezzo"]) {
            case "Automobile":
                color = "#BF360C";
                fillColor = "#FF8A65";
                break;
            case "Moto ":
                color = "#0D47A1";
                fillColor = "#64B5F6";
                break;
            case "Bicicletta":
                color = "#F9A825";
                fillColor = "#FFF176";
                break;
            case "Pedone":
                color = "#2E7D32";
                fillColor = "#81C784";
                break;
            default:
                color = "#37474F";
                fillColor = "#CFD8DC";
        }

        switch (incidenti[i]["Esito"]) {
            case "Grave":
                radius = 120;
                break;
            case "Codice Rosso":
                radius = 220;
                break;
            case "Mortale":
                radius = 350;
                break;
            default:
                radius: 120;
        }

        var c = L.circle([latLon[0], latLon[1]], {
            color: color,
            fillColor: color,
            fillOpacity: 0.6,
            weight: 1,
            radius: radius
        }).addTo(map);

        c.bindPopup(`${incidenti[i]["Dinamica"]}`)
    }  

})
.catch(function(error) {
    // Handle any errors that occur during the loading process
    console.log("Error loading the CSV file: " + error);
}); 

