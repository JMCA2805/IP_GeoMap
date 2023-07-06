import { MyIP, ObtenerCoor } from "./geoipify.js";

/*let ip_domain = "google.com";
const data = await ObtenerCoor(ip_domain)
console.log(data.latitud);
console.log(data.longitud);*/

// ***Map controller***
let map = L.map("map");
let osmLayer = L.tileLayer(
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
  let userMarker = L.marker([lat, lng]);
  userMarker.addTo(map);
  map.setView([lat, lng], 13);
} catch (error) {
  alert("No se pudo obtener tu ubicación");
}

// ***Input Search (based on IP or Domain)***
let searchInput = document.getElementById("search");
let searchIp = document.getElementById('bsearch');

searchIp.addEventListener('click', function (event) {
  let text = searchInput.value;
  Ipsearch(text);
})

searchInput.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    let text = searchInput.value;
    Ipsearch(text);
  }
});


async function Ipsearch (ip_domain){
  try {
    const geoIpData = await ObtenerCoor(ip_domain);
    const lat = geoIpData.latitud;
    const lng = geoIpData.longitud;
    let userMarker = L.marker([lat, lng]);
    userMarker.addTo(map);
    map.setView([lat, lng], 13);
  } catch (error) {
    alert("No se pudo obtener tu ubicación");
  }
}
