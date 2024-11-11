const card = document.querySelector(".homeCard");
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

    const title = card.querySelector('#productName'); 
    const img = card.querySelector('img');

    title.textContent = data.products[0].title;
    img.src = data.products[0].mainImage;
};

document.addEventListener('DOMContentLoaded', getData);
