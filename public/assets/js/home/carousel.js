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

        activeOld.classList.remove('active');
        activeNew.classList.add('active');

        const timeline = anime.timeline({
            easing: 'easeOutQuad',
            duration: 500,
            complete: resolve
        });

        timeline
            .add({
                targets: newContent,
                translateX: [-1000, 0],
                scale: [5, 1],
                opacity: [0, 1],
                filter: ["blur(5px)", "blur(0px)"],
                delay: 250,
                duration: 100,
                easing: 'easeOutElastic'
            })

            .add({
                targets: newImg,
                scale: [5, 1],
                opacity: [0, 1],
                filter: ["blur(20px)", "blur(0px)"],
                duration: 150,
                easing: 'easeOutQuad'
            }, 0);
    });
};

const startSlide = async () => {
    while (true) {
        await switchSlide();
        await new Promise(resolve => setTimeout(resolve, 5000));
    }
};

startSlide();


