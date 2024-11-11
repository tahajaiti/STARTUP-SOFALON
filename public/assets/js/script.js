let card = document.getElementById('card');
const pagination = document.getElementById('pagination');
let pagination1 = document.getElementById('pagination1');
let pagination2 = document.getElementById('pagination2');


const sortButton = document.getElementById('sortButton');
const filterButton = document.getElementById('filterButton');
const sortOptions = document.getElementById('sortOptions');
const filterOptions = document.getElementById('filterOptions');

let AZ = document.getElementById('AZ');
let ZA = document.getElementById('ZA');
let HTL = document.getElementById('HTL');
let LTH = document.getElementById('LTH');

let Beds = document.getElementById('Beds');
let Decoration = document.getElementById('Decoration');
let Kitchen = document.getElementById('Kitchen');
let Storagee = document.getElementById('Storage');
let Tables = document.getElementById('Tables');

let data = null;
let InitialProducts;
let azArray;

let currentPageN;
async function fetchProducts() {
    const response = await fetch('../../../products.json');
    data = await response.json();

    currentPageN = Math.ceil(data.products.length / 12);
    // console.log(currentPageN);

    DisplayCards(GFG(data.products, 1, 12));
    addPagination();
    azArray = [...data.products];
    let arrrr = [...data.products];

    AZ.addEventListener('click',function () {
        Sort(azArray,1);
        DisplayCards(GFG(azArray, 1, 12));
        sortOptions.style.display = 'none';
        filterOptions.style.display = 'none';
    });

    ZA.addEventListener('click',function () {
        Sort(azArray,2);
        DisplayCards(GFG(azArray, 1, 12));
        sortOptions.style.display = 'none';
        filterOptions.style.display = 'none';
    });
    HTL.addEventListener('click',function () {
        Sort(azArray,3);
        DisplayCards(GFG(azArray, 1, 12));
        sortOptions.style.display = 'none';
        filterOptions.style.display = 'none';
    });
    LTH.addEventListener('click',function () {
        Sort(azArray,4);
        DisplayCards(GFG(azArray, 1, 12));
        sortOptions.style.display = 'none';
        filterOptions.style.display = 'none';
    });
   
    Beds.addEventListener('click', function(){
         DisplayCards(Filtre(arrrr,1));
         filterOptions.style.display = 'none';
         sortOptions.style.display = 'none';
    })
    Decoration.addEventListener('click', function(){
         DisplayCards(Filtre(arrrr,2));
         filterOptions.style.display = 'none';
         sortOptions.style.display = 'none';
    })
    Kitchen.addEventListener('click', function(){
         DisplayCards(Filtre(arrrr,3));
         filterOptions.style.display = 'none';
         sortOptions.style.display = 'none';
    })
    Storagee.addEventListener('click', function(){
         DisplayCards(Filtre(arrrr,4));
         filterOptions.style.display = 'none';
         sortOptions.style.display = 'none';
    })
    Tables.addEventListener('click', function(){
         DisplayCards(Filtre(arrrr,5));
         filterOptions.style.display = 'none';
         sortOptions.style.display = 'none';
    })
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
                        <p class="text-lBrown text-sm ml-auto">$ ${product.price}</p>
                    </div>
                    <p class="text-lg font-semibold mt-2">${product.title}</p>
                    <button id ="details" class="bg-lBrown text-white py-1 rounded mt-2 border-2 border-transparent hover:bg-white hover:border-lBrown hover:text-lBrown transition-all duration-300">
                        SEE DETAILS
                    </button>
                </div>
            </div>`;
    });

    let details = document.querySelectorAll('#details');
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
function Sort(arr,type){
    if (type === 1) {
        for (var i = 0; i < arr.length; i++) {
            for (var j = 0; j < (arr.length - i - 1); j++) {
                if (arr[j].title > arr[j + 1].title) {
                    var temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }

    }else if(type === 2){
        for (var i = 0; i < arr.length; i++) {
            for (var j = 0; j < (arr.length - i - 1); j++) {
                if (arr[j].title < arr[j + 1].title) {
                    var temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }  
    }else if(type === 3){

        for (var i = 0; i < arr.length; i++) {
            for (var j = 0; j < (arr.length - i - 1); j++) {
                if (Number(arr[j].price )  < Number(arr[j + 1].price)) {
                    var temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
    } else if(type === 4){
        for (var i = 0; i < arr.length; i++) {
            for (var j = 0; j < (arr.length - i - 1); j++) {
                if (Number(arr[j].price )  > Number(arr[j + 1].price)) {
                    var temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
    }
}

// Filtre function

function Filtre(obj,type){
    let newarray = [];
    pagination.style.display = 'none';
    if(type === 1){

        for (let key in obj) {
            if (obj[key].category === 'Beds') {
                newarray.push(obj[key]);
            }
        }
        return newarray;
    }else if(type === 2){

        for (let key in obj) {
            if (obj[key].category === 'Decoration') {
                newarray.push(obj[key]);
            }
        }
        return newarray;
        
    }else if(type === 3){

        for (let key in obj) {
            if (obj[key].category === 'Kitchen') {
                newarray.push(obj[key]);
            }
        }
        return newarray;
        
    }else if(type === 4){

        for (let key in obj) {
            if (obj[key].category === 'Storage') {
                newarray.push(obj[key]);
            }
        }
        return newarray;
        
    }else if(type === 5){

        for (let key in obj) {
            if (obj[key].category === 'Tables') {
                newarray.push(obj[key]);
            }
        }
        return newarray;
    }
}
