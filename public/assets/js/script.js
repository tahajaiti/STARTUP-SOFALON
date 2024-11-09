let card = document.getElementById('card');
let pagination1 = document.getElementById('pagination1');
let pagination2 = document.getElementById('pagination2');
let data = null;


async function fetchProducts() {
    const response = await fetch('../../../products.json'); 
    data = await response.json();
    DisplayCards(data.products[0].Beds, data.products[0].Decoration, data.products[0].Kitchen);
}


function DisplayCards(...categories) {
    card.innerHTML = ''; 
    categories.forEach(category => {
        category.forEach(product => {
            card.innerHTML += `
                <div class="flex flex-col bg-white rounded-lg p-4 hover:shadow-lg transition-shadow duration-300 max-w-xs mx-auto">
                    <img src="${product.mainImage}" class="bg-whiteGrey p-2" alt="Product Image">
                    <div class="flex flex-col mt-4">
                        <div class="reviews flex gap-1 items-center">
                            <div class="flex">
                                <span class="icon-[ri--star-fill] text-lBrown w-3"></span>
                                <span class="icon-[ri--star-fill] text-lBrown w-3"></span>
                                <span class="icon-[ri--star-fill] text-lBrown w-3"></span>
                                <span class="icon-[ri--star-fill] text-lBrown w-3"></span>
                                <span class="icon-[ri--star-fill] text-lBrown w-3"></span>
                            </div>
                            <p class="text-SoftGray text-sm">(Reviews)</p>
                            <p class="text-lBrown text-sm ml-auto">${product.price}</p>
                        </div>
                        <p class="text-lg font-semibold mt-2">${product.title}</p>
                        <button class="bg-lBrown text-white py-1 rounded mt-2 border-2 border-transparent hover:bg-white hover:border-lBrown hover:text-lBrown transition-all duration-300">
                            SEE DETAILS
                        </button>
                    </div>
                </div>`;
        });
    });
}


pagination1.addEventListener('click', () => {
    setActiveButton(pagination1, pagination2);
    DisplayCards(data.products[0].Beds, data.products[0].Decoration, data.products[0].Kitchen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

pagination2.addEventListener('click', () => {
    setActiveButton(pagination2, pagination1);
    DisplayCards(data.products[0].Storage, data.products[0].Tables);
    window.scrollTo({ top: 0, behavior: 'smooth' });
});


function setActiveButton(activeButton, inactiveButton) {
    activeButton.classList.add('bg-lBrown', 'text-white');
    activeButton.classList.remove('bg-white', 'border', 'border-SoftGray', 'text-gray');
    inactiveButton.classList.add('bg-white', 'border', 'border-SoftGray', 'text-gray');
    inactiveButton.classList.remove('bg-lBrown', 'text-white');
}

fetchProducts();
