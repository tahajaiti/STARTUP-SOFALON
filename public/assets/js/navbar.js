const openBtn = document.querySelector('#openNav');
const closeBtn = document.querySelector('#closeNav');
const nav = document.querySelector('#mobileNav');

const openCart = document.querySelector('#openCart');
const closeCart = document.querySelector('#closeCart');
const mainCart = document.querySelector('#cartMain');
const cartReal = document.querySelector('#cartReal');

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

// Cart functionality

openCart.addEventListener('click', (e) => {
    e.preventDefault();

    mainCart.classList.toggle('hidden');

    anime({
        targets: mainCart,
        opacity: [0, 1],
        duration: 500,
        easing: 'easeOutQuad'
    });

    anime({
        targets: cartReal,
        translateX: [1000, 0],
        opacity: [0, 1],
        duration: 250,
        easing: 'easeOutQuad'
    });
});

closeCart.addEventListener('click', (e) => {
    e.preventDefault();

    anime({
        targets: cartReal,
        translateX: [0, 1000],
        opacity: [1, 0],
        duration: 250,
        easing: 'easeInQuad'
    });
    
    anime({
        targets: mainCart,
        opacity: [1, 0],
        duration: 500,
        easing: 'easeInQuad',
        complete: () => {
            mainCart.classList.toggle('hidden');
        }
    });
});