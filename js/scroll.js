import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import ScrollSmoother from 'gsap/dist/ScrollSmoother';
import { Observer } from 'gsap/all';
import SplitText from 'gsap/dist/SplitText';
import { DrawSVGPlugin } from 'gsap/all';
gsap.registerPlugin(
	ScrollTrigger,
	ScrollSmoother,
	Observer,
	DrawSVGPlugin,
	SplitText,
);

ScrollTrigger.normalizeScroll(true);

// create the smooth scroller FIRST!
let smoother = ScrollSmoother.create({
	smooth: 1.3,

	ignoreMobileResize: true, // skips ScrollTrigger.refresh() on mobile resizes from address bar showing/hiding
	preventDefault: true,

	effects: true,
	normalizeScroll: true,
});
let winW = window.innerWidth;
// Loader
ScrollTrigger.refresh();
window.addEventListener('load', (event) => {
	let perfData = window.performance.timing, // The PerformanceTiming interface represents timing-related performance information for the given page.
		EstimatedTime = -(perfData.loadEventEnd - perfData.navigationStart),
		time = parseInt((EstimatedTime / 1000) % 60) * 100;

	// Percentage Increment Animation
	let PercentageID = $('#precent'),
		start = 0,
		end = 100,
		durataion = time,
		winW = window.innerWidth;
	animateValue(PercentageID, start, end, durataion);

	function animateValue(id, start, end, duration) {
		let range = end - start,
			current = start,
			increment = end > start ? 1 : -1,
			stepTime = Math.abs(Math.floor(duration / range)),
			obj = $(id);

		$('.loader > #loader-logo-path-one, #loader-logo').attr('stroke-width', 4);
		gsap.set('.loader > #loader-logo-path-one, #loader-logo', {
			visibility: 'visible',
			drawSVG: 0,
		});

		$('.loader').fadeIn(0);

		let timer = setInterval(function () {
			current += increment;
			$(obj).text(current + '%');

			gsap.fromTo(
				'.loader > #loader-logo-path-one,  #loader-logo',
				{
					drawSVG: 0,
				},
				{
					duration: 0,
					drawSVG: `${current}%`,
					onComplete: allComplete,
				},
			);

			if (current == end) {
				clearInterval(timer);
			}
		}, stepTime);
	}

	// Fading Out Loadbar on Finised
	setTimeout(function () {
		ScrollTrigger.refresh();
		$('.loader').addClass('start');
		$('.loader').delay(2000).fadeOut(1000);
	}, time);
	function allComplete() {
		$('.loader').removeClass('start');
		$('.loader, .masthead ').addClass('done');
	}

	/* Masthead Animation */

	let TextAni = gsap.utils.toArray('[data-split-lines]');
	TextAni.forEach(function (textanimation) {
		new SplitText('[data-split-lines]', {
			type: 'lines',
			linesClass: 'split-line',
		});
		gsap
			.timeline({
				defaults: {
					duration: 8,
					ease: 'sine.out',
				},
			})
			.from(TextAni, {
				opacity: 1,
				ease: 'sine.out',
				duration: 0,
			});
	});
	if (winW > 992) {
		gsap
			.timeline({
				defaults: {
					ease: 'sine.out',
				},
			})
			.fromTo(
				TextAni,
				{
					y: '-200%',
					opacity: 0,
				},
				{
					y: 0,
					opacity: 1,
					ease: 'sine.out',
					transformOrigin: 'center',
					stagger: 0.1,
					duration: 8,
				},
			);
	} else if (winW < 992) {
		gsap
			.timeline({
				defaults: {
					ease: 'none',
				},
			})
			.fromTo(
				TextAni,
				{
					x: '-100%',
					opacity: 0,
				},
				{
					x: 0,
					opacity: 1,
					ease: 'sine.out',
					transformOrigin: 'center',
					stagger: 0.1,
					duration: 1.1,
				},
				'<0.8',
			);

		/* Masthead */
	}
	if (winW > 1024) {
		/* Project Text animation */
		let TextQuote = gsap.utils.toArray('[data-qoute]');
		let section = document.querySelector('#project , #about');

		gsap.set(TextQuote, {
			perspective: 400,
			autoAlpha: 1,
		});

		var mySplitText = new SplitText(TextQuote, { type: 'words' }),
			words = mySplitText.words;

		var tl = gsap.timeline({ paused: true }).from(words, {
				opacity: 0,
				y: -10,
				rotationX: 6,
				transformOrigin: '0% 50% -50',
				ease: 'back',
				stagger: 0.1,
				duration: 0.2,
				onComplete: allDone,
			}),
			numWords = mySplitText.words.length;

		function allDone() {
			mySplitText.revert();
			// tl.kill()
		}

		ScrollTrigger.create({
			trigger: section,
			start: '-=50%center top',
			end: 'bottom bottom',
			pinSpacing: false,
			scrub: 1,

			durataion: 0,

			onEnter: () => {
				var newSplitText = new SplitText(TextQuote, { type: 'words' }),
					words = newSplitText.words;
				tl.play(0);
			},
		});
	}
	/*  project showcase Animation */
	let singleContainer = document.querySelector('.container.single');
	let containerTitle = document.querySelector(
		'.inner-container .container-text h2',
	);
	gsap.to(containerTitle, {
		opacity: 0,
		scrollTrigger: {
			trigger: containerTitle,
			start: 'top top',
			endTrigger: singleContainer,
			opacity: 1,
			scrub: 1,
		},
	});
	if (winW > 992) {
		function randomIntFromInterval(min, max) {
			return Math.floor(Math.random() * (max - min + 1) + min);
		}

		let innerContainer = singleContainer.querySelector('.inner-container');
		let sections = gsap.utils.toArray('.container.single .panel');
		let text = document.querySelector('.container-text');

		let panPinned = gsap.to(sections, {
			scrollTrigger: {
				trigger: singleContainer,
				pin: true,
				start: 'top top',
				end: () => '+=' + innerContainer.offsetWidth * 1.5,
				scrub: 1,
			},
		});

		sections.forEach((section, index) => {
			const rndEND = randomIntFromInterval(65, 110);
			const rndSTART = randomIntFromInterval(12, 22);
			const endMultiplier = rndEND / 100;
			const startMultiplier = rndSTART / 10;

			let scrollTween = gsap.fromTo(
				section,
				{
					x: () => innerWidth / startMultiplier,
				},
				{
					x: () => -1 * (innerContainer.offsetWidth - innerWidth),
					ease: 'none',
					scrollTrigger: {
						trigger: singleContainer,
						start: 'top 65%',
						pin: false,
						scrub: 1,
						end: () =>
							'+=' + (innerContainer.offsetWidth + innerWidth * endMultiplier),
					},
				},
			);

			const rndVH = randomIntFromInterval(5, 50);
			let OpacityTweenIn = gsap.fromTo(
				section,
				{
					opacity: 0,
					y: rndVH + 'vh',
				},
				{
					opacity: 1,
					y: '0',
					ease: 'power2.inOut',
					scrollTrigger: {
						trigger: singleContainer,
						start: 'top 50%',

						pin: false,
						scrub: 1,
						end: 'center 25%',
					},
				},
			);
		});
	}

	/* Project Text End Animations */

	/* About Start Animations */

	let Text = document.querySelectorAll('.about__text');
	let TextContainers = document.querySelectorAll('.about .about__content');
	if (winW >= 1300) {
		gsap.to('.about', {
			scrollTrigger: {
				trigger: '.about',
				scrub: true,
				pin: true,
				pinSpacer: false,
				// pinSpacing: false,
				start: 'center center',
				end: 'bottom -100%',
				toggleClass: 'active',
				ease: 'power2',
			},
		});

		gsap.to('.about-svg svg', {
			scrollTrigger: {
				trigger: '.about',
				scrub: 0.7,
				start: 'top top',
				end: 'bottom -100%',
				ease: 'power2',
			},

			scale: 4,
		});

		gsap.to('.about-boy-img', {
			opacity: 0,
			scrollTrigger: {
				trigger: '.about-boy-img',
				opacity: 1,
				start: 'center center ',
				scrub: 2,
			},
		});
		TextContainers.forEach((TextContainer, i) => {
			gsap.fromTo(
				TextContainer,
				{ opacity: 0 },
				{
					opacity: 1,
					ease: 'power1.inOut',
					scrollTrigger: {
						trigger: Text[i],
						pinnedContainer: Text,
						start: 'center center',
						end: `+=${i + 1}00%`,
						scrub: true,
					},
				},
			);
		});
	}

	/* About End Animations */

	/* fade in animations Start*/
	if (winW > 992) {
		const sections = document.querySelectorAll('.skills');
		const headings = document.querySelectorAll('.skills .container');

		headings.forEach((heading, i) => {
			gsap.fromTo(
				heading,
				{ opacity: 0 },
				{
					opacity: 1,
					ease: 'power1.inOut',
					scrollTrigger: {
						trigger: sections[i],
						pin: '.skills',
						pinnedContainer: '.skills',
						start: 'center center',
						end: `+=${i + 1}00%`,
						scrub: true,
					},
				},
			);
		});
	}
});
/* Masthead Animation */
$(document).ready(function () {
	gsap.to(window, {
		scrollTo: {
			y: 0,
			autoKill: false,
		},
		duration: 1,
	});
});
