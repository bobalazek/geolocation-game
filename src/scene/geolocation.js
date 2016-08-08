function prepareGeolocation() {
    if (navigator.geolocation) {
        var geolocationOptions = {
            enableHighAccuracy: true,
            maximumAge: 5000,
            timeout: 15000,
        };

        navigator.geolocation.getCurrentPosition(
            onGeolocationSuccess,
            onGeolocationError,
            geolocationOptions
        );

        navigator.geolocation.watchPosition(
            onGeolocationSuccess,
            onGeolocationError,
            geolocationOptions
        );
    } else {
        alert('Sorry, seems that your device does not support geolocation.')
    }
}

/*********** Callbacks **********/
function onGeolocationSuccess(position) {
    var isInitialLocationSet = geolocation.initial;

    // Set the initial, center coordinates & center tile
    if (!isInitialLocationSet) {
        centerCoordinates = {
            lng: position.coords.longitude,
            lat: position.coords.latitude,
        };
        centerTile = {
            x: lng2tile(centerCoordinates.lng, MAP_ZOOM),
            y: lat2tile(centerCoordinates.lat, MAP_ZOOM),
        };

        geolocation.initial = true;
    }

    currentCoordinates = {
        lng: position.coords.longitude,
        lat: position.coords.latitude,
    };

    var detail = {
        coordinates: currentCoordinates,
        position: position,
        initial: !isInitialLocationSet, // inverse, because we want to know if that are the initial coordinates
    };

    $(document).trigger('geolocationchange', {
        detail: detail,
    });
}

function onGeolocationError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            alert('User denied the request for Geolocation.');
            break;
        case error.POSITION_UNAVAILABLE:
            alert('Location information is unavailable.');
            break;
        case error.TIMEOUT:
            alert('The request to get user location timed out.');
            break;
        case error.UNKNOWN_ERROR:
            alert('An unknown error occurred.');
            break;
    }
}
