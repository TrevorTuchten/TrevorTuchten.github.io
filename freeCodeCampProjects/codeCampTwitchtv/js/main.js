/**
 * Created by tntdi_000 on 5/14/2016.
 */
"use strict";

var $show = $('#showUsers');
var $toggleButton = $('.toggleButton');
var $allText = $('#allText');
var $onText = $('#onText');
var $offText = $('#offText');
var $all = $('#all');
var $online = $('#online');
var $offline = $('#offline');

var channels = ["OgamingSC2","tntgenesis","trick2g","freecodecamp","storbeck","terakilobyte","habathcx",
                "RobotCaleb","thomasballinger","noobs2ninjas","beohoff","test_channel","brunofin","comster404"];

function channelInfo() {
    channels.forEach(function (channel) {
        function channelUrls(type, name) {
            return 'https://api.twitch.tv/kraken/' + type + '/' + name + '?callback=?';
        }
        $.getJSON(channelUrls("streams", channel),
            function (data) {
                var game, status;
                    if (data.stream === null) {
                        game = "Offline";
                        status = "offline";
                    } else if (data.stream === undefined) {
                        game = "Account Closed";
                        status = "offline";
                    } else {
                        game = data.stream.game;
                        status = "online"
                    }
        $.getJSON(channelUrls("channels", channel),
            function (data) {
                var logo = data.logo != null ? data.logo : "http://www.bitrebels.com/wp-content/uploads/2011/02/Original-Facebook-Geek-Profile-Avatar-6.jpg",
                    name = data.display_name != null ? data.display_name : channel,
                    description = status === "online" ? ': ' + data.status : "";
                var userList = '<div class="row ' + status + '" id="body"><div class="col-xs-2 col-sm-2"' +
                    ' id="userImage"><img src="' + logo + '" class="logo"></div>' +
                    ' <div class="col-xs-10 col-sm-3 font-effect-neon" id="userName"><a href="' +
                    data.url + '" target="_blank">' + name + '</a></div>' +
                    ' <div class="col-xs-10 col-sm-7 font-effect-neon" id="userStatus">'+
                    game + '<span class="hidden-xs">' +
                    description + '</span></div></div>';
                status === "online" ? $show.prepend(userList) : $show.append(userList);
            })
        });
    })
}

function btnCtrl1() {

    var allWidth = $all.css('width');
    var allCl = $all.hasClass('active');
    allWidth = parseInt(allWidth);
    if (allWidth < 70) {
        setTimeout(function () {
            $allText.removeClass('hidden');
        },250)
    } else if (allCl === true){
        setTimeout(function () {
            $allText.removeClass('hidden');
        },250)
    } else {
        setTimeout(function () {
            $allText.addClass('hidden');
        },250)
    }
}

function btnCtrl2() {

    var onWidth = $online.css('width');
    var onCl = $online.hasClass('active');
    onWidth = parseInt(onWidth);
        if (onWidth < 70) {
            setTimeout(function () {
                $onText.removeClass('hidden');
            },250)
        } else if (onCl === true){
            setTimeout(function () {
                $onText.removeClass('hidden');
            },250)
        } else {
            setTimeout(function () {
                $onText.addClass('hidden');
            },250)
        }
}

function btnCtrl3() {

    var offWidth = $offline.css('width');
    var offCl = $offline.hasClass('active');
    offWidth = parseInt(offWidth);
    if (offWidth < 70) {
        setTimeout(function () {
            $offText.removeClass('hidden');
        },250)
    } else if (offCl === true){
        setTimeout(function () {
            $offText.removeClass('hidden');
        },250)
    } else {
        setTimeout(function () {
            $offText.addClass('hidden');
        },250)
    }
}

$(function () {

    $onText.addClass('hidden');
    $offText.addClass('hidden');
    channelInfo();

    $all.hover(function () {
        btnCtrl1();
    });
    $online.hover(function () {
        btnCtrl2();
    });
    $offline.hover(function () {
        btnCtrl3();
    });

    $toggleButton.on('click', function() {
        $toggleButton.removeClass("active");
        $toggleButton.find('span').addClass("hidden");
        $(this).addClass("active");
        $(this).find('span').removeClass("hidden");
            var status = $(this).attr('id');
                if (status === "all") {
                    $(".online, .offline").removeClass("hidden");
                } else if (status === "online") {
                    $(".online").removeClass("hidden");
                    $(".offline").addClass("hidden");
                } else {
                    $(".offline").removeClass("hidden");
                    $(".online").addClass("hidden");
                }
    });
});
