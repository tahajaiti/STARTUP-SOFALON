const card = document.getElementById('card');
const pagination = document.getElementById('pagination');

const sortButton = document.getElementById('sortButton');
const filterButton = document.getElementById('filterButton');
const sortOptions = document.getElementById('sortOptions');
const filterOptions = document.getElementById('filterOptions');

const AZ = document.getElementById('AZ');
const ZA = document.getElementById('ZA');
const HTL = document.getElementById('HTL');
const LTH = document.getElementById('LTH');

const Beds = document.getElementById('Beds');
const Decoration = document.getElementById('Decoration');
const Kitchen = document.getElementById('Kitchen');
const storage = document.getElementById('Storage');
const Tables = document.getElementById('Tables');

let data = JSON.parse(localStorage.getItem("products") || "[]");
let dataLocal = null;
let azArray;
let currentPageN;
async function fetchProducts() {
    
    if (data.length === 0 && !localStorage.getItem("products_loaded")) {
        try {
            const response = await fetch('./assets/Products.json');
            dataLocal = await response.json();
            
            if (dataLocal && dataLocal.products) {
                data = dataLocal.products;
                localStorage.setItem("products", JSON.stringify(data));
                localStorage.setItem("products_loaded", "true");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    currentPageN = Math.ceil(data.length / 12);

    DisplayCards(GFG(data, 1, 12));
    addPagination();
    azArray = data;

    AZ.addEventListener('click', () => handleSort(azArray, 1));
    ZA.addEventListener('click', () => handleSort(azArray, 2));
    HTL.addEventListener('click', () => handleSort(azArray, 3));
    LTH.addEventListener('click', () => handleSort(azArray, 4));

    Beds.addEventListener('click', () => handleFilter('Beds'));
    Decoration.addEventListener('click', () => handleFilter('Decoration'));
    Kitchen.addEventListener('click', () => handleFilter('Kitchen'));
    storage.addEventListener('click', () => handleFilter('Storage'));
    Tables.addEventListener('click', () => handleFilter('Tables'));

}

function GFG(array, currentPage, pageSize) {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return array.slice(startIndex, endIndex);
}

function DisplayCards(products) {
    card.innerHTML = '';
    products.forEach(product => {
        card.innerHTML += `
            <div class="flex flex-col bg-white w-full justify-between rounded-lg p-4 hover:shadow-lg transition-shadow duration-300 max-w-xs mx-auto">
                <img src="${product.mainImage}" class="bg-whiteGrey p-2 object-fill h-[200px]" alt="Product Image">
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
                        <p class="text-lBrown text-sm ml-auto">$ ${product.price}</p>
                    </div>
                    <p class="text-lg font-semibold mt-2">${product.title}</p>
                    <button id ="details" class="bg-lBrown text-white py-1 rounded mt-2 border-2 border-transparent hover:bg-white hover:border-lBrown hover:text-lBrown transition-all duration-300">
                        SEE DETAILS
                    </button>
                </div>
            </div>`;
    });

    const details = document.querySelectorAll('#details');
    details.forEach((button, index) => {
        button.addEventListener('click', () => {
            const productId = products[index].id;
            window.location.href = `ProductDetails.html?id=${productId}`;
        });
    });

}

const addPagination = () => {
    if (currentPageN > 0) {
        for (let i = 1; i <= currentPageN; i++) {
            const newPage = document.createElement('div');
            newPage.className = "flex w-8 h-8 border border-SoftGray text-lBrown text-xl justify-center items-center hover:cursor-pointer";
            newPage.id = `page`;
            newPage.textContent = i;
            pagination.appendChild(newPage);
            newPage.addEventListener('click', () => {
                DisplayCards(GFG(azArray, i, 12));

                window.scrollTo({ top: 0, behavior: 'smooth' });
                ActivePage(newPage);
            });
        };
        const firstPage = document.querySelector("#page");
        ActivePage(firstPage);
    };
};

function ActivePage(activeBtn) {
    const AllPage = document.querySelectorAll('#page');

    AllPage.forEach((page) => {
        page.classList.add('bg-white', 'border', 'border-SoftGray', 'text-gray');
        page.classList.remove('bg-lBrown', 'text-white');
    });
    activeBtn.classList.add('bg-lBrown', 'text-white');
    activeBtn.classList.remove('bg-white', 'border', 'border-SoftGray', 'text-gray');
}

sortButton.addEventListener('click', () => {
    if (sortOptions.style.display === 'none') {
        sortOptions.style.display = 'block';
        filterOptions.style.display = 'none';
    } else {
        sortOptions.style.display = 'none';
    }
});

filterButton.addEventListener('click', () => {
    if (filterOptions.style.display === 'none') {
        filterOptions.style.display = 'block';
        sortOptions.style.display = 'none';
    } else {
        filterOptions.style.display = 'none';
    }
});

// Search Function 
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener("keyup", (e) => {


    const searchData = e.target.value.toLowerCase();

    const filtered = data.filter(o => o.title.toLowerCase().startsWith(searchData));

    DisplayCards(filtered);
});

// Sort Function
function handleSort(arr, type) {
    let sortedArr;
    switch (type) {
        case 1:
            sortedArr = arr.sort((a, b) => a.title.localeCompare(b.title));
            break;
        case 2:
            sortedArr = arr.sort((a, b) => b.title.localeCompare(a.title));
            break;
        case 3:
            sortedArr = arr.sort((a, b) => b.price - a.price);
            break;
        case 4:
            sortedArr = arr.sort((a, b) => a.price - b.price);
            break;
    }
    DisplayCards(GFG(sortedArr, 1, 12));
    hideOptions();
}

// Filter function
function handleFilter(category) {
    const filteredData = data.filter(product => product.category === category);
    DisplayCards(filteredData);
    hideOptions();
}

function hideOptions() {
    sortOptions.style.display = 'none';
    filterOptions.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', fetchProducts);
