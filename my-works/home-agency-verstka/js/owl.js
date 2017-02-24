var owl = $('.owl-carousel');
owl.owlCarousel({
    stagePadding: 15,
    loop:true,
    margin:30,
    autoplay:true,
    autoplayTimeout:1000,
    autoplayHoverPause:true,
    dots:true,
    nav:false,
    dotsEach:4,
    dotData:true,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:3
        },
        1200:{
            items:4
        }
    }
});
owl.on('mousewheel', '.owl-stage', function (e) {
	var curr = $(this);
    if (e.originalEvent.wheelDeltaY>0) {
        curr.trigger('next.owl');
    } else {
        curr.trigger('prev.owl');
    }
    e.preventDefault();
});
