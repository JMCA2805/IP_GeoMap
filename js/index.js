import { MyIP, ObtenerCoor } from "./geoipify.js";

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
  CrearDiv(geoIpData);
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


async function Ipsearch(ip_domain) {
  try {
    const geoIpData = await ObtenerCoor(ip_domain);
    await BorrarDiv()
    CrearDiv(geoIpData);
    const lat = geoIpData.latitud;
    const lng = geoIpData.longitud;
    let userMarker = L.marker([lat, lng]);
    userMarker.addTo(map);
    map.setView([lat, lng], 13);
  } catch (error) {
    alert("No se pudo obtener tu ubicación");
  }
}

// Crear Div
async function CrearDiv(geoIpData) {
  // Div Dinámico
  const infDinamicoDiv = document.querySelector(".inf_dinamico");
  console.log(geoIpData)
  const title = ["Dirección IP", "País", "Estado", "Ciudad", "Zona Horaria", "Código Postal", "Latitud", "Longitud", "Nombre", "Dominio", "ISP"];
  const properties = Object.keys(geoIpData);
  let cont = 0;
  for (const property of properties) {
    // Create a new div
    const div = document.createElement("div");
    div.classList.add("propiedades");

    // Create a title div
    const titleDiv = document.createElement("div");
    titleDiv.classList.add("title");
    titleDiv.innerHTML = `<label>${title[cont]}:</label>`;

    // Create a metadatos div
    const metadatosDiv = document.createElement("div");
    metadatosDiv.classList.add("metadatos");
    if (geoIpData.hasOwnProperty(property) && geoIpData[property] !== undefined && geoIpData[property] !== "") {
      metadatosDiv.innerHTML = `<label> ${geoIpData[property]}</label>`;
    } else {
      metadatosDiv.innerHTML = `<label>No encontrado</label>`;
    }

    div.appendChild(titleDiv);
    div.appendChild(metadatosDiv);

    infDinamicoDiv.appendChild(div);

    cont++;
  }
}

// Borrar Div
async function BorrarDiv() {
  const divsToDelete = document.querySelectorAll(".propiedades");
  for (const div of divsToDelete) {
    await div.remove();
  }
}