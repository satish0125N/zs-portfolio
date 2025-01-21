import $ from "jquery";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import ScrollSmoother from "gsap/dist/ScrollSmoother";
import { TweenMax } from "gsap/gsap-core";
import { Power1 } from "gsap";
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, TweenMax);

let winW = $(window).width();
$(window)
  .bind("resize", function () {
    if ($(this).width() < 992) {
      $(".main-menu").addClass("disable");
    } else {
      $(".main-menu").removeClass("disable");
    }
  })
  .trigger("resize");

$(".menu-btn").on("click", () => {
  $(".menu-btn").toggleClass("active");
  $(".main-menu").toggleClass("active");

  if ($(".main-menu").hasClass("active")) {
    $("body").addClass("stop");
    // $(window).on('scroll');
    // window.scrollTo(0, 0);
  } else {
    $("body").removeClass("stop");
    // $(window).off('scroll');
  }

  if (winW > 992) {
    $(".main-menu").toggleClass("enable");
    gsap.from(".main-menu", {
      duration: 1,
      opacity: 0,
      // scale: 0,
      // ease: 'expoScale(5, 1)',
    });
    gsap.to(".main-menu", {
      duration: 1,
      opacity: 1,
      // scale: 1,
      // ease: 'expoScale(0, 0)',
    });
  }
});

$(window).on("scroll", (e) => {
  if ($(e.currentTarget).scrollTop() > 50) {
    $(".header").addClass("sticky");
  } else {
    $(".header").removeClass("sticky");
  }
});
