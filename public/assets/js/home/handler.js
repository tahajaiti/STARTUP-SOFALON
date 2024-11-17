const cards = document.querySelectorAll(".homeCard");
const loadingScreen = document.getElementById('loadingScreen');

let data = JSON.parse(localStorage.getItem("products") || "[]");
let dataLocal = null;

async function getData() {
    if (data.length === 0 && !localStorage.getItem("products_loaded")) {
        try {
            loadingScreen.style.display = 'flex';
            const response = await fetch('./assets/Products.json');
            dataLocal = await response.json();

            if (dataLocal && dataLocal.products) {
                data = dataLocal.products;
                localStorage.setItem("products", JSON.stringify(data));
                localStorage.setItem("products_loaded", "true");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            loadingScreen.style.display = 'none';
        }
    }
    loadData();
}

// shuffle
const shuffleArray = (array) => {
    for (let i = array.length - 1; i >= 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

const loadData = () => {
    if (!data) return;

    loadingScreen.style.display = 'none';

    const dataCopy = [...data];
    shuffleArray(dataCopy);

    cards.forEach((card, index) => {
        let random = dataCopy[index % dataCopy.length];

        let title = card.querySelector('#productName');
        let img = card.querySelector('img');
        let price = card.querySelector('#productPrice');

        if (title) title.textContent = random.title;
        if (img) img.src = random.mainImage;
        if (price) price.textContent = `$${random.price}`;

        card.addEventListener('click', () => {
            window.location.href = `ProductDetails.html?id=${random.id}`;
        });
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
            delay: anime.stagger(100, { easing: 'easeInQuart', direction: 'reverse' }),
            duration: 700,
            easing: 'easeInOutElastic',
        });
};


document.addEventListener('DOMContentLoaded', getData(),);
