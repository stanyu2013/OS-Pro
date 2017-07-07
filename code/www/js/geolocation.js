var watchID = null;

<!--// device APIs are available-->
<!--//-->
<!--//      function onDeviceReady() {-->
<!--//          // Get the most accurate position updates available on the-->
<!--//          // device.-->
<!--//          var options = { enableHighAccuracy: true, maximumAge: 100000 };-->
<!--//          navigator.geolocation.getCurrentPosition(showCountry,-->
<!--//                  onError, options);-->
<!--//-->
<!--//      }options-->

function doWork() {
    var options = { enableHighAccuracy: true, maximumAge: 100000 };
    navigator.geolocation.getCurrentPosition(showCountry,
            onError, options);
}



// clear the watch that was started earlier
function clearWatch() {
    if (watchID != null) {
        navigator.geolocation.clearWatch(watchID);
        watchID = null;
    }
}

// onError Callback receives a PositionError object
function onError(error) {
    alert('code: '    + error.code    + '\n' +
            'message: ' + error.message + '\n');
}


function showCountry(position) {
    geocoder = new google.maps.Geocoder();
    var lat = parseFloat(position.coords.latitude);
    var lng = parseFloat(position.coords.longitude);

    var latlng = new google.maps.LatLng(lat, lng);

    geocoder.geocode({'latLng': latlng}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            if (results[0]) {
                var arrAddress = results[0].address_components;
                // iterate through address_component array
                $.each(arrAddress, function (i, address_component) {
                    if (address_component.types[0] == "locality") {
                        console.log(address_component.long_name); // city
                        alert(address_component.long_name);
                        return false; // break
                    }
                });
            } else {
                alert("No results found");
            }
        } else {
            alert("Geocoder failed due to: " + status);
        }
    });
}