let data = JSON.parse(localStorage.getItem("products") || "[]");
let dataLocal = null;
let azArray;
let currentPageN;

let nextId;

const table = document.getElementById('table');
const addContainer = document.getElementById("addContainer");
const addProduct = document.getElementById("addProduct");
const container = document.getElementById("container");
const closePop = addContainer.querySelector("#close");
const pages = document.getElementById('pages');

const addForm = document.querySelector("#addForm");

const applyBtn = document.querySelector("#applyBtn");
console.log(applyBtn);

async function fetchProducts() {

    if (data.length === 0 && !localStorage.getItem("products_loaded")) {
        try {
            const response = await fetch('../../../products.json');
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
    nextId = data.length;
}

function GFG(array, currentPage, pageSize) {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return array.slice(startIndex, endIndex);
}

addProduct.addEventListener("click", function () {
    addContainer.style.display = 'block';
})
closePop.addEventListener('click', function () {
    addContainer.style.display = 'none';
})

const addPagination = () => {
    pages.innerHTML = "";
    currentPageN = Math.ceil(data.length / 12);

    if (currentPageN > 0) {
        for (let i = 1; i <= currentPageN; i++) {
            const newPage = document.createElement('div');
            newPage.className = "flex w-8 h-8 border border-SoftGray text-lBrown  text-xl justify-center items-center hover:cursor-pointer";
            newPage.id = `page`;
            newPage.textContent = i;
            pages.appendChild(newPage);
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

function DisplayCards(products) {
    table.innerHTML = '';
    let statusColor;
    let status;
    products.forEach(product => {

        if (product.stock === 0) {
            statusColor = 'bg-red-200 text-red-600';
            status = 'out stock';
        } else {
            statusColor = 'bg-green-200 text-green-600';
            status = 'in stock';
        }

        const newRow = document.createElement('tr');
        newRow.id = product.id;
        newRow.className = "border-b hover:bg-gray-50"
        newRow.innerHTML += `
                    <td class="py-4 px-6 flex items-center space-x-2">
                        <img src="${product.mainImage}" alt="Cherry Delight" class="h-8 w-8 rounded-full">
                        <span>${product.title}</span>
                    </td>
                    <td class="py-4 px-6 hidden sm:table-cell">${product.id}</td>
                    <td class="py-4 px-6 hidden sm:table-cell">$${product.price}</td>
                    <td class="py-4 px-6">${product.stock} pcs</td>
                    <td class="py-4 px-6 hidden sm:table-cell">${product.category}</td>
                    <td class="py-4 px-6">
                        <span class=" ${statusColor} px-3 py-1 rounded-full text-xs">${status}</span>
                    </td>
                    <td class="py-4 px-6 flex gap-2">
                        <span id="deleteItem" class="icon-[material-symbols--delete-outline] text-red-500 text-2xl"></span>
                        <span id="editItem" class="icon-[lucide--edit] text-[20px] text-blue-500"></span>
                    </td>
                    </tr>
                 `
        table.appendChild(newRow);

        const deleteItem = newRow.querySelector("#deleteItem");
        const editItem = newRow.querySelector("#editItem");

        deleteItem.addEventListener("click", function(e) {
            e.preventDefault();
            removeItem(product.id);
        });
        editItem.addEventListener("click", function(e) {
            e.preventDefault();

            
            editItemm(product);
        });
    });
}

const removeItem = (id) => {
    const itemIndex = data.findIndex(item => item.id === id);
    if (itemIndex > -1) {
        data.splice(itemIndex, 1);
        localStorage.setItem("products", JSON.stringify(data));
        nextId = data.length+1;

        DisplayCards(GFG(data, 1, 12));
        addPagination();
    }
}

applyBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    
    const formTitle = addForm.querySelector("#title");
    const formPrice = addForm.querySelector("#price");
    const formDescription = addForm.querySelector("#description");
    const formStock = addForm.querySelector("#stock");
    const formSKU = addForm.querySelector("#sku");
    const formCategory = addForm.querySelector("#category");
    const formImage = addForm.querySelector("#mainImage");
    const formImage1 = addForm.querySelector("#image1");
    const formImage2 = addForm.querySelector("#image2");

    console.log(formImage);

    const mainImageBase64 = await convertToBase64(formImage.files[0]);
    const image1Base64 = await convertToBase64(formImage1.files[0]);
    const image2Base64 = await convertToBase64(formImage2.files[0]);

    const newProduct = {
        id: nextId++,
        title: formTitle.value,
        price: parseFloat(formPrice.value),
        description: formDescription.value,
        stock: parseInt(formStock.value),
        category: formCategory.value,
        mainImage: mainImageBase64,
        SKU: formSKU.value,
        images: [
            image1Base64,
            image2Base64,
        ]
    };

    data.push(newProduct);
    localStorage.setItem("products", JSON.stringify(data));

    DisplayCards(GFG(data, 1, 12));
    addPagination();

    addContainer.style.display = 'none';
    formTitle.value = '';
    formPrice.value = '';
    formDescription.value = '';
    formStock.value = '';
    formSKU.value = '';
    formCategory.value = '';
    formImage.value = '';
    formImage1.value = '';
    formImage2.value = '';

    
});

function convertToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

let title = document.getElementById('title');
let price = document.getElementById('price');
let description = document.getElementById('description');
let stock = document.getElementById('stock');
let sku = document.getElementById('sku');
let category = document.getElementById('category');
let editBtn = document.getElementById('editBtn');

let currentProduct = null; 

function editItemm(product) {
    currentProduct = product;


    container.style.display = 'block';
    title.value = product.title;
    price.value = product.price;
    description.value = product.description;
    stock.value = product.stock;
    sku.value = product.SKU;
    category.value = product.category;
}


editBtn.addEventListener('click', function(event) {
    event.preventDefault();

    if (currentProduct) {
        currentProduct.title = title.value;
        currentProduct.price = price.value;
        currentProduct.description = description.value;
        currentProduct.stock = stock.value;
        currentProduct.SKU = sku.value;
        currentProduct.category = category.value;

        localStorage.setItem("products", JSON.stringify(data));
        DisplayCards(GFG(data, 1, 12));
        addPagination();

        container.style.display = 'none';
        currentProduct = null;
    }
});

document.addEventListener("DOMContentLoaded", fetchProducts);
