/**
 * Created by tntdi_000 on 5/10/2016.
 */
"use strict";

var lat;
var lon;
var name;
var temp;
var cond;
var icon;
//cache all dom elements
var $weather = $('#weather');
var $cond = $('#cond');
var $name = $('#name');
var $icon = $('#icon');

//Add loading wheel to page upon slow data transfer
$(document).ajaxStart(function () {
    $("#spinner").show();
});
$(document).ajaxComplete(function () {
    $("#spinner").fadeOut("slow");
});

//main pages functions to process after page loads
$(function () {

//javascript function to get users geolocation
    navigator.geolocation.getCurrentPosition(function (position) {
        lat = (position.coords.latitude);
        lon = (position.coords.longitude);

//openweather api which allows data collection based users geolocation
        $.getJSON('http://api.openweathermap.org/data/2.5/weather?' + 'lat=' + lat + '&lon=' + lon + '&APPID=4d44f56294e97b2a6f1f8e7f6b85cda7', function (data) {

//users city name attaches it to DOM
            name = data.name;
            $name.html(name);
//users current temperature attaches it to toggle button

            function tempInit() {
                temp = data.main['temp'];
                temp = (temp - 273.15) * 1.8 + 32; //k to f
                $weather.html("Current Temp: " + Math.round(temp) + "<button class='font-effect-outline' type='toggle' id='toggleB'>F</button>");
                $('#weather #toggleB').css("background-color", "transparent");
                $('#weather #toggleB').css("border", "none");
                $('#weather #toggleB').css("color", "blue");

                $('#weather #toggleB').on('click', function () {
                    temp = (temp - 32) * 5 / 9; //f to c
                    $weather.html("Current Temp: " + Math.round(temp) + "<button class='font-effect-outline' type='toggle' id='toggleC'>C</button>");
                    $('#weather #toggleC').css("background-color", "transparent");
                    $('#weather #toggleC').css("border", "none");
                    $('#weather #toggleC').css("color", "red");
                    $('#weather #toggleC').on('click', function () {
                        $weather.html($('#weather #toggleB'));
                        tempInit();
                    })
                });
            }
            tempInit();


            //gets the users current weather condition attaches it to DOM
            cond = JSON.parse(JSON.stringify(data['weather']));
            cond = cond[0].description;
            $cond.html(cond);

                icon = data['weather'];
                icon = icon[0].icon;
                //$icon.html(icon);

                switch (icon) {
                    case "01d":
                        var img01d = new Image();
                        img01d.src= 'http://il9.picdn.net/shutterstock/videos/8715808/thumb/1.jpg';
                        $icon.html(img01d);
                        break;
                    case "01n":
                        var img01n = new Image();
                        img01n.src= 'http://wallpapercave.com/wp/UAk3xHU.jpg';
                        $icon.html(img01n);
                        break;
                    case "02d":
                        var img02d = new Image();
                        img02d.src= 'http://www.wallpaperup.com/uploads/wallpapers/2013/03/14/52197/b224fe5f2a0d423e45b529d866adc404.jpg';
                        $icon.html(img02d);
                        break;
                    case "02n":
                        var img02n = new Image();
                        img02n.src= 'http://www.wallpaperup.com/uploads/wallpapers/2012/10/16/19553/ba3c9dc193006723b89b44fd9375abae.jpg';
                        $icon.html(img02n);
                        break;
                    case "03d":
                        var img03d = new Image();
                        img03d.src= 'http://farm4.staticflickr.com/3030/2860982418_15f770417f_z.jpg?zz=1';
                        $icon.html(img03d);
                        break;
                    case "03n":
                        var img03n = new Image();
                        img03n.src= 'https://isardasorensen.files.wordpress.com/2012/04/tp-brooding-monday-night-4-23-12.jpg';
                        $icon.html(img03n);
                        break;
                    case "04d":
                        var img04d = new Image();
                        img04d.src= 'http://moviewriternyu.files.wordpress.com/2013/11/dark-clouds1.jpg';
                        $icon.html(img04d);
                        break;
                    case "04n":
                        var img04n = new Image();
                        img04n.src= 'http://2.bp.blogspot.com/-KNxBhTrS170/USkgtqCx7UI/AAAAAAAAEzY/X3N7l5SBlc4/s1600/dark_clouds-wallpaper-1440x900.jpg';
                        $icon.html(img04n);
                        break;
                    case "09d":
                        var img09d = new Image();
                        img09d.src= 'http://viola.bz/wp-content/uploads/2012/11/Rain-is-grace-12.gif';
                        $icon.html(img09d);
                        break;
                    case "09n":
                        var img09n = new Image();
                        img09n.src= 'http://www.coolchaser.com/images/city_b.gif';
                        $icon.html(img09n);
                        break;
                    case "10d":
                        var img10d = new Image();
                        img10d.src= 'http://www.sharegif.com/wp-content/uploads/2013/09/21/rain-gif-20.gif';
                        $icon.html(img10d);
                        break;
                    case "10n":
                        var img10n = new Image();
                        img10n.src= 'http://38.media.tumblr.com/7cf6407f211a79f0bee6d0fb9526ce10/tumblr_n5tdtcsqZN1s9lm88o1_500.gif';
                        $icon.html(img10n);
                        break;
                    case "11d":
                        var img11d = new Image();
                        img11d.src= 'http://1.bp.blogspot.com/-BQCOWJL3J68/VCVpa56Q5JI/AAAAAAAAA4g/6BabE_tcDdE/s1600/giphy.gif';
                        $icon.html(img11d);
                        break;
                    case "11n":
                        var img11n = new Image();
                        img11n.src= 'https://33.media.tumblr.com/f04927ab936222327feff580cba338c6/tumblr_mv0xa2S6Gm1r4zr2vo2_r1_500.gif';
                        $icon.html(img11n);
                        break;
                    case "13d":
                        var img13d = new Image();
                        img13d.src= "http://2.bp.blogspot.com/-5debALbuRPs/UvJMrfcPpqI/AAAAAAAACjU/cNRhnxK_9NY/s1600/It's+Another+Snow+Day!.gif";
                        $icon.html(img13d);
                        break;
                    case "13n":
                        var img13n = new Image();
                        img13n.src= 'http://24.media.tumblr.com/tumblr_mdwwd3SvZB1rbvjfno1_500.gif';
                        $icon.html(img13n);
                        break;
                    case "50d":
                        var img50d = new Image();
                        img50d.src= 'http://becauseblogdotcom.files.wordpress.com/2011/11/foggy-day-but-climbing-was-ok3.jpg';
                        $icon.html(img50d);
                        break;
                    case "50n":
                        var img50n = new Image();
                        img50n.src= 'http://triciaphotodotcom.files.wordpress.com/2012/02/a-foggy-night.jpg';
                        $icon.html(img50n);
                        break;
                    default:
                }
        });
    });
});
