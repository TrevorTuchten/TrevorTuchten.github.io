var currentQuote = "";
var currentAuthor = "";

function intitial() {
    //get quote info
    $.ajax({
        headers: {
            'X-Mashape-Key': 'Q2N0kdQZqomshdWcOvOEOO2y6PNFp14hLf2jsnrlFnsPkgPJ1q',
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        url: 'https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous',
        success: function (info) {
            // parse data create variable
            var response = JSON.parse(info);
            currentQuote = response.quote;
            currentAuthor = response.author;
            //display data on page
            if ((currentQuote.length + currentAuthor.length) < 102 ) {
                $('.quote').html('"' + currentQuote + '"');
                $('.author').html(currentAuthor);
                //animate projector
                $('.light').hide(100).show(10);
            } else {
                intitial();
            }
        }
    });
}

$(function () {
        //shows quote upon page load
            intitial();
        //cycles through quotes upon button click
            $('#newQuote').on('click', function () {
                intitial();
            });
        //tweet the displayed quote
        $('#tweetQuote').on('click', function () {
            var twtUrl = 'http://bit.ly/QuoteGen';
            var twtText = currentQuote + " -" + currentAuthor;
            var via = 'via' + ' @tnt_genesis_';
            var twtLink = 'http://twitter.com/home?status=' + encodeURIComponent(twtText + ' ' + via + ' ' + twtUrl);

            window.open(twtLink, '', 'width=575, height=400');
        })
        }
);
