import $ from 'jquery';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import ScrollSmoother from 'gsap/dist/ScrollSmoother';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin);
let winW = $(window).width();
$(function () {
	var maxL = 140;

	$('.service-text-para').each(function () {
		var text = $(this).text();
		if (text.length > maxL) {
			var begin = text.substr(0, maxL),
				end = text.substr(maxL);

			$(this)
				.html(begin)
				.append($('<a class="readmore"/>').attr('href', '#').html('read more...'))
				.append($('<span class="hidden" />').html(end));
		}
	});

	$(document).on('click', '.readmore', function (e) {
		e.preventDefault();
		$(this).hide();
		$(this).next('.hidden').fadeIn(400);
	});
});

let mainContainer = document.querySelector('.horizontal');
let item = document.querySelector('.horizontal .item');

if (winW > 992) {
	gsap.to(mainContainer, {
		x: () => {
			return -(
				mainContainer.scrollWidth -
				window.innerWidth +
				window.innerWidth * 0.05 +
				(window.innerWidth / 2 - item.offsetWidth / 2)
			);
		},
		ease: 'none',
		scrollTrigger: {
			trigger: mainContainer,
			start: () => 'top +=30%top',
			endTrigger: '.service',
			pin: '.service .container',
			pinSpacing: true,
			pinSpacer: false,
			scrub: 1,
			invalidateOnRefresh: true,
			anticipatePin: 1,
		},
	});
}
