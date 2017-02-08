'use strict';

var $res = $('.resume');
var $lastBackground = $('.banner');
var $chngBtns = $('.banner-social-buttons')[0].children;
var $toggleResume = $('.toggleResume');

$toggleResume.on('click', function() {

	$res.toggleClass('hidden');

	if ($res.hasClass('hidden') && $(window).width() < 1280) {
		$lastBackground.height('400px');


		for(var i = 0; i < $chngBtns.length; i++) {
			$chngBtns[i].style.display = 'inline-block';
		}

	} else if (!$res.hasClass('hidden') && $(window).width() < 1280) {
		$lastBackground.height('850px');

		for(var i = 0; i < $chngBtns.length; i++) {
			$chngBtns[i].style.float = 'right';
		}
	} else if ($res.hasClass('hidden') && $(window).width() > 1280) {
		$lastBackground.height('400px');
	} else if (!$res.hasClass('hidden') && $(window).width() > 1280) {
		$lastBackground.height('600px');
	} 
});
