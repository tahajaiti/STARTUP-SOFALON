const items = document.querySelectorAll('.listItem');
let count = items.length;
let active = 0;

const switchSlide = async () => {
    active = active + 1;

    if (active >= count) {
        active = 0;
    }
    await showSlide();
};

const showSlide = () => {
    return new Promise(resolve => {
        const activeOld = document.querySelector('.listItem.active');
        const activeNew = items[active];

        const newContent = activeNew.querySelector('.itemContent');
        const newImg = activeNew.querySelector('img');

        const tl = gsap.timeline({
            onComplete: resolve
        });

        tl.add(() => {
            activeOld.classList.remove('active');
            activeNew.classList.add('active');
        });

        const newContentTl = gsap.timeline();
        newContentTl.set(newContent, {
            x: -10000,
            scale: 5,
            skewX: 100,
            filter: "blur(5px)",
        })
        .to(newContent, {
            x: 0,
            scale: 1,
            skewX: 0,
            delay: 0.5,
            duration: 0.2,
            ease: 'elastic',
        })
        .to(newContent, {
            duration: 0.1,
            filter: "blur(0px)",
            ease: 'ease',
        }),"<";

        const newImgTl = gsap.timeline();
        newImgTl.set(newImg, {
            scale: 5,
            opacity: 0,
            filter: "blur(20px)",
        })
        .to(newImg, {
            scale: 1,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.25,
            ease: "ease",
        });
    });
};

const startSlide = async () => {
    while (true) {
        await switchSlide();
        await new Promise(resolve => setTimeout(resolve, 5000));
    }
};

startSlide(); // Start the slide
