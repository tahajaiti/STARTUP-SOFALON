
const items = document.querySelectorAll('.listItem');

let count = items.length;

let active = 0;

const switchSlide = () => {
    active = active + 1;

    if (active >= count) {
        active = 0;
    }
    showSlide();
};

const showSlide = () => {
    const activeOld = document.querySelector('.listItem.active');
    const activeNew = items[active];

    const oldContent = activeOld.querySelector('content');

    gsap

    activeOld.classList.remove('active');

    activeNew.classList.add('active');
};

setInterval(switchSlide, 5000);