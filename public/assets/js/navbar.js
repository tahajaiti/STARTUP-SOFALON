const openBtn = document.querySelector('#openNav');
const closeBtn = document.querySelector('#closeNav');
const nav = document.querySelector('#mobileNav');

openBtn.addEventListener('mouseenter', (e) => {
    console.log('open');
    anime({
        targets: openBtn,
        rotate: [ 0, 180 ],
        duration: 1000,
      });
});


openBtn.addEventListener('click', (e) => {
    e.preventDefault();

    nav.style.transform = 'translateY(-1000px) scale(0.5)';
    nav.style.opacity = '0';
    nav.classList.remove('hidden');

    anime({
        targets: nav,
        translateY: [ -1000, 0 ],
        opacity: [ 0, 1 ],
        scale: [ 0.5, 1 ],
        duration: 250,
        easing: 'easeOutQuad',
        delay: 100
    });
});

closeBtn.addEventListener('click', (e) => {
    e.preventDefault();

    anime({
        targets: closeBtn,
        rotate: [ -180, 180 ],
        duration: 1000,
        easing: 'easeOutQuad'
    });

    anime({
        targets: nav,
        translateY: [ 0, -1000 ],
        opacity: [ 1, 0 ],
        scale: [ 1, 0.5 ],
        duration: 250,
        easing: 'easeInQuad',
        delay: 100,
        complete: () => {
            nav.classList.add('hidden');
        }
    });
});
