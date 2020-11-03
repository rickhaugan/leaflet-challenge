// Creating map object
var myMap = L.map("mapid", {
    center: [41.2565, -95.9345],
    zoom: 4
});

// Adding tile layer to the map
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/light-v10",
    accessToken: API_KEY
}).addTo(myMap);

// Store API query variables
var baseURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";


// Assemble API query URL
var url = baseURL 

// Grab the data with d3
d3.json(url).then(function (response) {



    function colorCodes(depth) {

        if (depth <= 10) {
            return "#FFFF00"
        }
        else if (depth < 100) {
            return "#FFA500"
        }
        else  {
            return "#FF0000"
        }


    }



    function geojsonMarkerOptions(feature) {
        return {
            radius: feature.properties.mag,
            fillColor: colorCodes(feature.geometry.coordinates[2]),
            color: "#000",
            weight: 1,
            opacity: .05,
            fillOpacity: 0.8,
            
        }
    };



    function onEachFeature(feature, layer) {
        if (feature.properties && feature.properties.title) {
            layer.bindPopup(feature.properties.title);
        }
    }
    


    L.geoJSON(response, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, geojsonMarkerOptions);
        },
        style: geojsonMarkerOptions,
        onEachFeature: onEachFeature

        
    }).addTo(myMap);


//adding legend to map
    legend = L.control({position: "bottomright"});
    legend.onAdd = function() {
      let div = L.DomUtil.create("div", "info legend");

      let legendInfo = "<div style='background-color: white;'> <h1>Depth Range</h1><h1>Yellow 0-10 </h1><h1>Orange 11-100 </h1> <h1>Red 101-1000 </h1></div>" 

  
      div.innerHTML = legendInfo;

      return div;
    };
  
    legend.addTo(myMap);




});
