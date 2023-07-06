const apikey = "at_rpXAJFV21e0DsOX8n5ROoj8FMqKVU";
let ip_domain = "";

// Obtener IP y Dirección
function MyIP () {
    const geoipify = 'https://geo.ipify.org/api/v2/country,city?apiKey='+apikey;
    console.log(geoipify);
}

// Buscar IP o Dominio y Obtener Dirección
function ObtenerCoor () {
    const search_geoipify = 'https://geo.ipify.org/api/v2/country,city?apiKey='+apikey+'&ipAddress='+ip_domain+'&domain='+ip_domain;
    console.log(search_geoipify);
}

export {MyIP,ObtenerCoor};