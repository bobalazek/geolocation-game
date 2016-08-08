/***** Helpers *****/
// http://wiki.openstreetmap.org/wiki/Slippy_map_tilenames
function lng2tile(lon, zoom, precise) {
    var res = (lon + 180) / 360 * Math.pow(2, zoom);
    if (precise) return res;
    return Math.floor(res);
}

function lat2tile(lat, zoom, precise) {
    var res = (
        1 - Math.log(
            Math.tan(lat * Math.PI / 180) + 1 /
            Math.cos(lat * Math.PI / 180)
        ) / Math.PI
    ) / 2 * Math.pow(2, zoom);
    if (precise) return res;
    return Math.floor(res);
}

function tile2lng(x, z) {
    return x / Math.pow(2, z) * 360 - 180;
}

function tile2lat(y, z) {
    var n = Math.PI - 2 * Math.PI * y / Math.pow(2, z);
    return 180 / Math.PI * Math.atan(
        0.5 * (Math.exp(n) - Math.exp(-n))
    );
}

function randomFloat(min, max) {
    return parseFloat(
        (Math.random() * (min - max) + max).toFixed(6)
    )
}

function degreesToRadians(value) {
    return value * (Math.PI / 180);
}

function radiansToDegrees(value) {
    return value * (180/Math.PI);
}

function bearing(lat1, lng1, lat2, lng2) {
    var dLon = (lng2-lng1);
    var y = Math.sin(dLon) * Math.cos(lat2);
    var x = Math.cos(lat1)*Math.sin(lat2) - Math.sin(lat1)*Math.cos(lat2)*Math.cos(dLon);
    var brng = radiansToDegrees(Math.atan2(y, x));
    return 360 - ((brng + 360) % 360);
}

// http://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula
function geolocationDistance(lat1, lon1, lat2, lon2) {
  var p = 0.017453292519943295;    // Math.PI / 180
  var c = Math.cos;
  var a = 0.5 - c((lat2 - lat1) * p)/2 +
          c(lat1 * p) * c(lat2 * p) *
          (1 - c((lon2 - lon1) * p))/2;

  return 12742000 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
}
