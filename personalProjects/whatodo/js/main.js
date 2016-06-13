"use strict";
//Make certain variables available globally
var lat;
var lon;
var name;
var temp;
var cond;
var map;
var placeName;
var placeLoc;
var request;
//catch all of the DOM elements
var $btn1 = $('#btn1');
var $btn2 = $('#btn2');
var $btn3 = $('#btn3');
var $btn4 = $('#btn4');
var $btn5 = $('#btn5');
var $btn6 = $('#btn6');
var $weather = $('#weather');
var $cond = $('#cond');
var $name = $('#name');

//Add loading wheel to page upon slow data transfer
$(document).ajaxStart(function () {
    $("#spinner").show();
});
$(document).ajaxComplete(function () {
    $("#spinner").fadeOut("slow");
});

//default parameters for loading google maps integrated
//with google places
function initialize() {
    var center = new google.maps.LatLng(lat, lon);

//tweet function
    !function(d,s,id){
        var js,fjs=d.getElementsByTagName(s)[0],
            p=/^http:/.test(d.location)?'http':'https';
        if(!d.getElementById(id)){
            js=d.createElement(s);js.id=id;
            js.src=p+'://platform.twitter.com/widgets.js';
            fjs.parentNode.insertBefore(js,fjs);
        }
    }(document, 'script', 'twitter-wjs');

//load google map
var map = new google.maps.Map(document.getElementById('googleMap'), {
        center: center,
        zoom: 12
    });

// Specify location, radius and place types for your Places API search.
     request = {
        location: center,
        radius: '50000',
        type: ['store']
    };

// Create the PlaceService and send the request.
// Handle the callback with an anonymous function.
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, function(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
                var place = results[i];
                var marker = new google.maps.Marker({
                    map: map,
                    position: place.geometry.location,
                    clickable: true
                });
// If the request succeeds, draw the place location on
// the map as a marker, and register events to handle a
// the marker.

//stores the place information relieved from google's servers
                 placeName = place['name'];
                 placeLoc = place['vicinity'];

//populates the hover over info window with information
//and sets its size
                marker.info = new google.maps.InfoWindow({
                    content: placeName + ' - ' + placeLoc + '.',
                    maxWidth: 400
                });
//creates a hover over event for place information
                google.maps.event.addListener(marker, 'mouseover', function() {
                    var marker_map = this.getMap();
                    this.info.open(marker_map, this);
                });
//event to close info window on mouse leave
                google.maps.event.addListener(marker, 'mouseout', function() {
                    var marker_map = this.getMap();
                    this.info.close(marker_map, this);
                });
//creates and populates the event and information necessary to share
//each marker name and location to twitter.
                google.maps.event.addListener(marker, 'click', function() {


                    var plName = this.info.content;
                    var twtUrl = 'http://whatodo.co.nf';
                    var twtStart = "I'm about to head over to ";
                    var twtEnd = "Who's going to join me?";
                    var twtLink = 'http://twitter.com/home?status=' + encodeURIComponent(twtStart + ' ' + plName + ' ' + twtEnd + ' ' + twtUrl);

                    window.open(twtLink, '', 'width=575, height=400');
                });
            }
        }
    });
}

// Run the initialize function when the window has finished loading.
google.maps.event.addDomListener(window, 'load', initialize);

//main pages functions to process after page loads
$(function () {

//javascript function to get users geolocation
    navigator.geolocation.getCurrentPosition(function(position) {
        lat = (position.coords.latitude);
        lon = (position.coords.longitude);

//openweather api which allows data collection based users geolocation
        $.getJSON('http://api.openweathermap.org/data/2.5/weather?' + 'lat=' + lat + '&lon=' + lon + '&APPID=4d44f56294e97b2a6f1f8e7f6b85cda7', function (data) {

//users city name attaches it to DOM
            name = data.name;
            $name.html(name);
//users current temperature attaches it to DOM
            temp = data.main['temp'];
            temp = (temp - 273.15) * 1.8 + 32; //k to f
            //temp = (temp - 32) * 5 / 9; //f to c
            $weather.html('Current Temp: ' + Math.round(temp) + 'f');
//gets the users current weather condition attaches it to DOM
            cond = JSON.parse(JSON.stringify(data['weather']));
            cond = cond[0].description;
            $cond.html(cond);

        });
//fires google places/maps function
initialize();
//I attempted to use one function to modify the get parameters through various
//ajax and javascript array functions. At the moment the only way to make it work
//was to fire a whole new request. I know this is not DRY code and will continue
//to research this issue

//listen event that triggers all new parameters of places
//to be displayed on map.
        $btn1.on('click', function () {
            function initializeBtn1() {
                var center = new google.maps.LatLng(lat, lon);

                var map = new google.maps.Map(document.getElementById('googleMap'), {
                    center: center,
                    zoom: 12
                });

// Specify location, radius and place types for your Places API search.
                request = {
                    location: center,
                    radius: '50000',
                    type: ['movie_theater']
                };
// Create the PlaceService and send the request.
// Handle the callback with an anonymous function.
                var service = new google.maps.places.PlacesService(map);
                service.nearbySearch(request, function(results, status) {
                    if (status == google.maps.places.PlacesServiceStatus.OK) {
                        for (var i = 0; i < results.length; i++) {
                            var place = results[i];
                            var marker = new google.maps.Marker({
                                map: map,
                                position: place.geometry.location,
                                clickable: true
                            });
// If the request succeeds, draw the place location on
// the map as a marker, and register an event to handle a
// click on the marker.
                            placeName = place['name'];
                            placeLoc = place['vicinity'];

                            marker.info = new google.maps.InfoWindow({
                                content: placeName + ' - ' + placeLoc + '.',
                                maxWidth: 400
                            });

                            google.maps.event.addListener(marker, 'mouseover', function() {
                                var marker_map = this.getMap();
                                this.info.open(marker_map, this);
                            });
                            google.maps.event.addListener(marker, 'mouseout', function() {
                                var marker_map = this.getMap();
                                this.info.close(marker_map, this);
                            });
                            google.maps.event.addListener(marker, 'click', function() {


                                var plName = this.info.content;
                                var twtUrl = 'http://whatodo.co.nf';
                                var twtStart = "I'm about to head over to ";
                                var twtEnd = "Who's going to join me?";
                                var twtLink = 'http://twitter.com/home?status=' + encodeURIComponent(twtStart + ' ' + plName + ' ' + twtEnd + ' ' + twtUrl);

                                window.open(twtLink, '', 'width=575, height=400');
                            });
                        }
                    }
                });
            }

// Run the initializeBtn1 function when the window has finished loading.
            google.maps.event.addDomListener(window, 'load', initializeBtn1);
            initializeBtn1();
        });

        $btn2.on('click', function () {
            function initializeBtn2() {
                var center = new google.maps.LatLng(lat, lon);

                var map = new google.maps.Map(document.getElementById('googleMap'), {
                    center: center,
                    zoom: 12
                });

// Specify location, radius and place types for your Places API search.
                request = {
                    location: center,
                    radius: '50000',
                    type: ['restaurant']
                };
// Create the PlaceService and send the request.
// Handle the callback with an anonymous function.
                var service = new google.maps.places.PlacesService(map);
                service.nearbySearch(request, function(results, status) {
                    if (status == google.maps.places.PlacesServiceStatus.OK) {
                        for (var i = 0; i < results.length; i++) {
                            var place = results[i];
                            var marker = new google.maps.Marker({
                                map: map,
                                position: place.geometry.location,
                                clickable: true
                            });
// If the request succeeds, draw the place location on
// the map as a marker, and register an event to handle a
// click on the marker.
                            placeName = place['name'];
                            placeLoc = place['vicinity'];

                            marker.info = new google.maps.InfoWindow({
                                content: placeName + ' - ' + placeLoc + '.',
                                maxWidth: 400
                            });

                            google.maps.event.addListener(marker, 'mouseover', function() {
                                var marker_map = this.getMap();
                                this.info.open(marker_map, this);
                            });
                            google.maps.event.addListener(marker, 'mouseout', function() {
                                var marker_map = this.getMap();
                                this.info.close(marker_map, this);
                            });
                            google.maps.event.addListener(marker, 'click', function() {


                                var plName = this.info.content;
                                var twtUrl = 'http://whatodo.co.nf';
                                var twtStart = "I'm about to head over to ";
                                var twtEnd = "Who's going to join me?";
                                var twtLink = 'http://twitter.com/home?status=' + encodeURIComponent(twtStart + ' ' + plName + ' ' + twtEnd + ' ' + twtUrl);

                                window.open(twtLink, '', 'width=575, height=400');
                            });
                        }
                    }
                });
            }

// Run the initializeBtn2 function when the window has finished loading.
            google.maps.event.addDomListener(window, 'load', initializeBtn2);
            initializeBtn2();
        });

        $btn3.on('click', function () {
            function initializeBtn3() {
                var center = new google.maps.LatLng(lat, lon);

                var map = new google.maps.Map(document.getElementById('googleMap'), {
                    center: center,
                    zoom: 12
                });

// Specify location, radius and place types for your Places API search.
                request = {
                    location: center,
                    radius: '50000',
                    type: ['night_club']
                };
// Create the PlaceService and send the request.
// Handle the callback with an anonymous function.
                var service = new google.maps.places.PlacesService(map);
                service.nearbySearch(request, function(results, status) {
                    if (status == google.maps.places.PlacesServiceStatus.OK) {
                        for (var i = 0; i < results.length; i++) {
                            var place = results[i];
                            var marker = new google.maps.Marker({
                                map: map,
                                position: place.geometry.location,
                                clickable: true
                            });
// If the request succeeds, draw the place location on
// the map as a marker, and register an event to handle a
// click on the marker.
                            placeName = place['name'];
                            placeLoc = place['vicinity'];

                            marker.info = new google.maps.InfoWindow({
                                content: placeName + ' - ' + placeLoc + '.',
                                maxWidth: 400
                            });

                            google.maps.event.addListener(marker, 'mouseover', function() {
                                var marker_map = this.getMap();
                                this.info.open(marker_map, this);
                            });
                            google.maps.event.addListener(marker, 'mouseout', function() {
                                var marker_map = this.getMap();
                                this.info.close(marker_map, this);
                            });
                            google.maps.event.addListener(marker, 'click', function() {
                                var plName = this.info.content;
                                var twtUrl = 'http://whatodo.co.nf';
                                var twtStart = "I'm about to head over to ";
                                var twtEnd = "Who's going to join me?";
                                var twtLink = 'http://twitter.com/home?status=' + encodeURIComponent(twtStart + ' ' + plName + ' ' + twtEnd + ' ' + twtUrl);

                                window.open(twtLink, '', 'width=575, height=400');
                            });
                        }
                    }
                });
            }

// Run the initializeBtn3 function when the window has finished loading.
            google.maps.event.addDomListener(window, 'load', initializeBtn3);
            initializeBtn3();
        });

        $btn4.on('click', function () {
            function initializeBtn4() {
                var center = new google.maps.LatLng(lat, lon);

                var map = new google.maps.Map(document.getElementById('googleMap'), {
                    center: center,
                    zoom: 12
                });

// Specify location, radius and place types for your Places API search.
                request = {
                    location: center,
                    radius: '50000',
                    type: ['lodging']
                };
// Create the PlaceService and send the request.
// Handle the callback with an anonymous function.
                var service = new google.maps.places.PlacesService(map);
                service.nearbySearch(request, function(results, status) {
                    if (status == google.maps.places.PlacesServiceStatus.OK) {
                        for (var i = 0; i < results.length; i++) {
                            var place = results[i];
                            var marker = new google.maps.Marker({
                                map: map,
                                position: place.geometry.location,
                                clickable: true
                            });
// If the request succeeds, draw the place location on
// the map as a marker, and register an event to handle a
// click on the marker.
                            placeName = place['name'];
                            placeLoc = place['vicinity'];

                            marker.info = new google.maps.InfoWindow({
                                content: placeName + ' - ' + placeLoc + '.',
                                maxWidth: 400
                            });

                            google.maps.event.addListener(marker, 'mouseover', function() {
                                var marker_map = this.getMap();
                                this.info.open(marker_map, this);
                            });
                            google.maps.event.addListener(marker, 'mouseout', function() {
                                var marker_map = this.getMap();
                                this.info.close(marker_map, this);
                            });
                            google.maps.event.addListener(marker, 'click', function() {


                                var plName = this.info.content;
                                var twtUrl = 'http://whatodo.co.nf';
                                var twtStart = "I'm about to head over to ";
                                var twtEnd = "Who's going to join me?";
                                var twtLink = 'http://twitter.com/home?status=' + encodeURIComponent(twtStart + ' ' + plName + ' ' + twtEnd + ' ' + twtUrl);

                                window.open(twtLink, '', 'width=575, height=400');
                            });
                        }
                    }
                });
            }

// Run the initializeBtn4 function when the window has finished loading.
            google.maps.event.addDomListener(window, 'load', initializeBtn4);
            initializeBtn4();
        });

        $btn5.on('click', function () {
            function initializeBtn5() {
                var center = new google.maps.LatLng(lat, lon);

                var map = new google.maps.Map(document.getElementById('googleMap'), {
                    center: center,
                    zoom: 12
                });

// Specify location, radius and place types for your Places API search.
                request = {
                    location: center,
                    radius: '50000',
                    type: ['museum']
                };
// Create the PlaceService and send the request.
// Handle the callback with an anonymous function.
                var service = new google.maps.places.PlacesService(map);
                service.nearbySearch(request, function(results, status) {
                    if (status == google.maps.places.PlacesServiceStatus.OK) {
                        for (var i = 0; i < results.length; i++) {
                            var place = results[i];
                            var marker = new google.maps.Marker({
                                map: map,
                                position: place.geometry.location,
                                clickable: true
                            });
// If the request succeeds, draw the place location on
// the map as a marker, and register an event to handle a
// click on the marker.
                            placeName = place['name'];
                            placeLoc = place['vicinity'];

                            marker.info = new google.maps.InfoWindow({
                                content: placeName + ' - ' + placeLoc + '.',
                                maxWidth: 400
                            });

                            google.maps.event.addListener(marker, 'mouseover', function() {
                                var marker_map = this.getMap();
                                this.info.open(marker_map, this);
                            });
                            google.maps.event.addListener(marker, 'mouseout', function() {
                                var marker_map = this.getMap();
                                this.info.close(marker_map, this);
                            });
                            google.maps.event.addListener(marker, 'click', function() {


                                var plName = this.info.content;
                                var twtUrl = 'http://whatodo.co.nf';
                                var twtStart = "I'm about to head over to ";
                                var twtEnd = "Who's going to join me?";
                                var twtLink = 'http://twitter.com/home?status=' + encodeURIComponent(twtStart + ' ' + plName + ' ' + twtEnd + ' ' + twtUrl);

                                window.open(twtLink, '', 'width=575, height=400');
                            });
                        }
                    }
                });
            }

// Run the initializeBtn5 function when the window has finished loading.
            google.maps.event.addDomListener(window, 'load', initializeBtn5);
            initializeBtn5();
        });

        $btn6.on('click', function () {
            function initializeBtn6() {
                var center = new google.maps.LatLng(lat, lon);

                var map = new google.maps.Map(document.getElementById('googleMap'), {
                    center: center,
                    zoom: 12
                });

// Specify location, radius and place types for your Places API search.
                request = {
                    location: center,
                    radius: '50000',
                    type: ['zoo']
                };
// Create the PlaceService and send the request.
// Handle the callback with an anonymous function.
                var service = new google.maps.places.PlacesService(map);
                service.nearbySearch(request, function(results, status) {
                    if (status == google.maps.places.PlacesServiceStatus.OK) {
                        for (var i = 0; i < results.length; i++) {
                            var place = results[i];
                            var marker = new google.maps.Marker({
                                map: map,
                                position: place.geometry.location,
                                clickable: true
                            });
// If the request succeeds, draw the place location on
// the map as a marker, and register an event to handle a
// click on the marker.
                            placeName = place['name'];
                            placeLoc = place['vicinity'];

                            marker.info = new google.maps.InfoWindow({
                                content: placeName + ' - ' + placeLoc + '.',
                                maxWidth: 400
                            });

                            google.maps.event.addListener(marker, 'mouseover', function() {
                                var marker_map = this.getMap();
                                this.info.open(marker_map, this);
                            });
                            google.maps.event.addListener(marker, 'mouseout', function() {
                                var marker_map = this.getMap();
                                this.info.close(marker_map, this);
                            });
                            google.maps.event.addListener(marker, 'click', function() {


                                var plName = this.info.content;
                                var twtUrl = 'http://whatodo.co.nf';
                                var twtStart = "I'm about to head over to ";
                                var twtEnd = "Who's going to join me?";
                                var twtLink = 'http://twitter.com/home?status=' + encodeURIComponent(twtStart + ' ' + plName + ' ' + twtEnd + ' ' + twtUrl);

                                window.open(twtLink, '', 'width=575, height=400');
                            });
                        }
                    }
                });
            }

// Run the initializeBtn6 function when the window has finished loading.
            google.maps.event.addDomListener(window, 'load', initializeBtn6);
            initializeBtn6();
        });
    });
});

