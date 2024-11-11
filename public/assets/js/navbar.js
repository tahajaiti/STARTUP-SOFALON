const openBtn = document.querySelector('#openNav');
const closeBtn = document.querySelector('#closeNav');
const nav = document.querySelector('#mobileNav');

openBtn.addEventListener('click', (e) => {
    e.preventDefault();

    gsap.set(nav, {
        y: -1000,
        opacity: 0,
        scale: 0.5, 
    });

    gsap.to(nav, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: "power4.out",
        delay: 0.1, 
    });

    nav.classList.remove('hidden');
});


closeBtn.addEventListener('click', (e) => {
    e.preventDefault();

    gsap.to(nav, {
        y: -1000,
        opacity: 0,
        scale: 0.5,
        duration: 0.4,
        ease: "power4.in",
        onComplete: () => {
            nav.classList.add('hidden');
        },
    });
});
