import $ from 'jquery';
import { gsap } from 'gsap';
import SplitText from 'gsap/dist/SplitText';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { TimelineLite } from 'gsap/gsap-core';
import { TweenLite } from 'gsap/gsap-core';
import { TimelineMax } from 'gsap/gsap-core';
import { ScrollToPlugin } from 'gsap/src/all';
gsap.registerPlugin(SplitText, ScrollTrigger, TweenLite, TimelineMax);

var winW = $(window).width();
$(document).ready(function () {
	(function () {
		var words = [
				'HTML/HTML5',
				'CSS/CSS3',
				'JAVA SCRIPT',
				'BOOTSTRAP',
				'SCSS',
				'PHP',
			],
			i = 0;
		setInterval(function () {
			$('#changeText').fadeOut(function () {
				$(this)
					.html('(' + words[(i = (i + 1) % words.length)] + ')')
					.fadeIn();
			});
		}, 2000);
	})();
});
document.addEventListener('DOMContentLoaded', () => {
	$('.skills-toggle li:first-child').addClass('active');
	$('.skills-list').hide();
	$('.skills-list:first').show();

	// Click function
	$('.skills-toggle li').click(function () {
		$('.skills-toggle li').removeClass('active');
		$(this).addClass('active');
		$('.skills-list').hide();
		var activeTab = $(this).find('.toggle-btn').attr('href');
		$(activeTab).fadeIn();
		return false;
	});

	// window.addEventListener('load', () => {
	// })
});
