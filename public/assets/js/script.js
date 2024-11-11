let card = document.getElementById('card');
const pagination = document.getElementById('pagination');
let pagination1 = document.getElementById('pagination1');
let pagination2 = document.getElementById('pagination2');


const sortButton = document.getElementById('sortButton');
const filterButton = document.getElementById('filterButton');
const sortOptions = document.getElementById('sortOptions');
const filterOptions = document.getElementById('filterOptions');

let AZ = document.getElementById('AZ');
let data = null;
let InitialProducts;
let azArray;

let currentPageN;
async function fetchProducts() {
    const response = await fetch('../../../products.json');
    data = await response.json();

    currentPageN = Math.ceil(data.products.length / 12);
    console.log(currentPageN);

    DisplayCards(GFG(data.products, 1, 12));
    addPagination();
    azArray = [...data.products];

    AZ.addEventListener('click',function () {
        console.log('okkkkkkkkkkkkkkksdbddggdgd');
        SortAZ(azArray);
    });
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
                DisplayCards(GFG(data.products, i, 12));

                console.log(GFG(data.products, i, 12));

                window.scrollTo({ top: 0, behavior: 'smooth' });
                ActivePage(newPage);
            });
        };
        const firstPage = document.querySelector("#page");
        ActivePage(firstPage);
    };
};



function ActivePage(activebtn) {
    const AllPage = document.querySelectorAll('#page');

    AllPage.forEach((page) => {
        page.classList.add('bg-white', 'border', 'border-SoftGray', 'text-gray');
        page.classList.remove('bg-lBrown', 'text-white');
    });
    activebtn.classList.add('bg-lBrown', 'text-white');
    activebtn.classList.remove('bg-white', 'border', 'border-SoftGray', 'text-gray');
}


fetchProducts();




sortButton.addEventListener('click', () => {
    if (sortOptions.style.display === 'none') {
        sortOptions.style.display = 'block';
    } else {
        sortOptions.style.display = 'none';
    }
});

filterButton.addEventListener('click', () => {
    if (filterOptions.style.display === 'none') {
        filterOptions.style.display = 'block';
    } else {
        filterOptions.style.display = 'none';
    }
});


// Search Function 
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener("keyup", (e)=> {


    const searchData = e.target.value.toLowerCase();
    
    const fileterdData = data.products.filter(o => o.title.toLowerCase().startsWith(searchData));

    DisplayCards(fileterdData);
}); 

// Sort Function
function SortAZ(arr){
    for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < (arr.length - i - 1); j++) {
            if (arr[j].title > arr[j + 1].title) {
                var temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    DisplayCards(arr);
}
