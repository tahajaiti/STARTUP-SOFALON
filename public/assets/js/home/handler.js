const cards = document.querySelectorAll(".homeCard");
const loadingScreen = document.getElementById('loadingScreen');

let data = null;

async function getData() {
    try {
        loadingScreen.style.display = 'flex';

        const response = await fetch('./assets/Products.json');
        data = await response.json();

        await loadData();
    } catch (error) {
        console.error("Error fetching data:", error);
    } finally {
        loadingScreen.style.display = 'none';
    }
}

// shuffle
const shuffleArray = (array) =>{
    for (let i = array.length - 1; i >= 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

const loadData = () => {
    if (!data) return;

    const dataCopy = [...data.products];
    shuffleArray(dataCopy);

    cards.forEach((card, index) => {
        const random = dataCopy[index % dataCopy.length];

        const title = card.querySelector('#productName');
        const img = card.querySelector('img');
        const price = card.querySelector('#productPrice');

        if (title) title.textContent = random.title;
        if (img) img.src = random.mainImage;
        if (price) price.textContent = `$${random.price}`;
    });

    const timeline = anime.timeline({
        easing: 'easeOutExpo',
        duration: 500,
    });

    timeline
        .add({
            targets: cards,
            translateX: [-5000, 0],
            opacity: [0, 1],
            scale: [0.3, 0.75],
            filter: ["blur(10px)", "blur(0px)"],
            delay: anime.stagger(100, {easing: 'easeInQuart',direction: 'reverse'}),
            duration: 700,
            easing: 'easeInOutElastic',
        });
};

setInterval  (() => {
    loadData();
}, 10000);

document.addEventListener('DOMContentLoaded', getData);
