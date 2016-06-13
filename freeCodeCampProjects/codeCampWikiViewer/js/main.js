/**
 * Created by tntdi_000 on 5/13/2016.
 */
"use strict";


var q;
var $loadBtn;
var $target = $('#target');
var $results = $('#results');

$(function () {
    
    popField();
    
});

function popField() {
    
    $loadBtn = ("<button id='searchB'><i class='fa fa-search' aria-hidden='true'></i></button><h3 id=" +
                    " iconText>Click icon to search</h3>");

    $('#searchWiki').html($loadBtn);

    popField2();
}

function popField2() {

    $('#searchB').on('click', function () {
        $('#searchWiki').replaceWith("<h3 id='searchWiki'><form id='form'><input id='searchTerm' type='text' />" +
            "<input id='closeSearch' type='reset' value='X' /></form></h3>");

        search();

        $('#closeSearch').on('click', function () {
            closeSearch();
        });
    });
}
function search() {
    
    $('#searchTerm').keypress(function(e){
        if (e.which == 13) {
            e.preventDefault();
            q = $('#searchTerm').val();
            
            $.getJSON("http://en.wikipedia.org/w/api.php?callback=?",
                {
                    srsearch: q,
                    action: "query",
                    list: "search",
                    format: "json"
                },
                function (data) {
                    $results.empty();

                    $.each(data.query.search, function (i, item) {
                        $results.append("<div><a href='http://en.wikipedia.org/wiki/" + encodeURIComponent(item.title) + "'>" +
                            "<br>" + item.title + "</a>" + "<br>" + item.snippet + "</div>");
                       $results.css('box-shadow', '2px 2px #00000');
                    });
                });
        }
    });
}
function closeSearch() {

    $('#searchWiki').html($loadBtn);
    $results.empty();
    $results.css('background-color', '');

    popField();
}

popField();
