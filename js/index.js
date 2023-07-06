import { MyIP, ObtenerCoor } from "./geoipify.js";

// ***Map controller***
var map = L.map("map");
var osmLayer = L.tileLayer(
  "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  {
    attribution:
      'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
  }
);
osmLayer.addTo(map);


// ***Startup of map based on IP***
try {
  const geoIpData = await MyIP();
  const lat = geoIpData.latitud;
  const lng = geoIpData.longitud;
  var userMarker = L.marker([lat, lng]);
  userMarker.addTo(map);
  map.setView([lat, lng], 13);
} catch (error) {
  alert("No se pudo obtener tu ubicación");
}

function getCurrentPositionByGeolocation() {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      var lat = position.coords.latitude;
      var lng = position.coords.longitude;
      var userMarker = L.marker([lat, lng]);
      userMarker.addTo(map);
      map.setView([lat, lng], 13);
    },
    function (error) {
      alert("No se pudo obtener tu ubicación");
    }
  );
}

// ***Get current position by geolocation***
var getLocationButton = document.getElementById('geolocationButton')
getLocationButton.addEventListener('click', function (event) {
  getCurrentPositionByGeolocation();
})

// ***Input Search (based on location)***
var searchInput = document.getElementById("search");
searchInput.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    var query = searchInput.value;
    if (query) {
      var url =
        "https://nominatim.openstreetmap.org/search?format=json&q=" + query;
      fetch(url)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          if (data.length > 0) {
            var location = data[0];
            var lat = location.lat;
            var lng = location.lon;
            var locationMarker = L.marker([lat, lng]);
            locationMarker.addTo(map);
            map.setView([lat, lng], 13);
          } else {
            alert("No se encontró la ubicación");
          }
        })
        .catch(function (error) {
          alert("No se pudo realizar la búsqueda");
        });
    }
  }
});

// ***Triggers ***

// let ip_domain = "google.com";
// const data = await ObtenerCoor(ip_domain)
// console.log(data.latitud);
// console.log(data.longitud);
