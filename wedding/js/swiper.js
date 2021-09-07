var swiper = new Swiper('.swiper-container', {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: '1.5',
    coverflowEffect: {
        rotate: 20,
        stretch: 0,
        depth: 200,
        modifier: 1,
        slideShadows: true,
    },
    loop: true,
    pagination: {
        el: '.swiper-pagination',
    },
    zoom : {
        maxRatio : 1.3,
    }
});