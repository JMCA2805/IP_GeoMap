const apikey = "";
const geoipify = 'https://geo.ipify.org/api/v2/country,city?apiKey=' + apikey;

// Obtener IP y Dirección
async function MyIP() {
    const results = await fetch(geoipify)
        .then(response => response.json())
        .then(async data => {
            const results = {
                "ip": data.ip,
                "país": data.location.country,
                "estado": data.location.region,
                "ciudad": data.location.city,
                "zona_horaria": data.location.timezone,
                "codigo_postal": data.location.postalCode,
                "latitud": data.location.lat,
                "longitud": data.location.lng,
                "nombre": data.as.name,
                "dominio": data.as.domain,
                "isp": data.isp
            }
            return await results;
        });
    return await results;
}

// Buscar IP o Dominio y Obtener Dirección
async function ObtenerCoor(ip_domain) {
    const results = await fetch(geoipify + '&ipAddress=' + ip_domain + '&domain=' + ip_domain)
        .then(response => response.json())
        .then(async data => {
            const results = {
                "ip": data.ip,
                "país": data.location.country,
                "estado": data.location.region,
                "ciudad": data.location.city,
                "zona_horaria": data.location.timezone,
                "codigo_postal": data.location.postalCode,
                "latitud": data.location.lat,
                "longitud": data.location.lng,
                "nombre": data.as.name,
                "dominio": data.as.domain,
                "isp": data.isp
            }
            return await results;
        });
    return await results;

}

export { MyIP, ObtenerCoor };