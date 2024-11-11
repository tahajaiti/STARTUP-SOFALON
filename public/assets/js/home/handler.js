const cards = document.querySelectorAll(".homeCard");
let data = null;

async function getData() {
    try {
        const response = await fetch('./products.json');
        data = await response.json();

        console.log(data);
        loadData(); // Call loadData after data is fetched
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

const loadData = () => {
    if (!data) return;

    cards.forEach((card) => {
        const randomIndex = Math.floor(Math.random() * data.products.length);
        const randomProduct = data.products[randomIndex];

        const title = card.querySelector('#productName');
        const img = card.querySelector('img');

        if (title) title.textContent = randomProduct.title;
        if (img) img.src = randomProduct.mainImage;
    });
};


document.addEventListener('DOMContentLoaded', getData);
