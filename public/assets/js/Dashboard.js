let data = JSON.parse(localStorage.getItem("products") || "[]");
let dataLocal = null;
let azArray;
let currentPageN;

const table = document.getElementById('table');
const addProduct = document.getElementById("addProduct");
const closePop = document.getElementById("close");
const container = document.getElementById("container");
const pages = document.getElementById('pages');

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
}

function GFG(array, currentPage, pageSize) {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return array.slice(startIndex, endIndex);
}

addProduct.addEventListener("click", function () {
    container.style.display = 'block';
})
closePop.addEventListener('click', function () {
    container.style.display = 'none';
})


const addPagination = () => {
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
                        <span class="icon-[lucide--edit] text-[20px] text-blue-500"></span>
                    </td>
                    </tr>
                 `
        table.appendChild(newRow);

        const deleteItem = newRow.querySelector("#deleteItem");

        deleteItem.addEventListener("click", function (e) {
            e.preventDefault();
            removeItem(product.title);
        });

    });
}


const removeItem = (title) => {
    const itemIndex = data.findIndex(item => item.title === title);
    if (itemIndex > -1) {
        data.splice(itemIndex, 1);
        localStorage.setItem("products", JSON.stringify(data));

        DisplayCards(GFG(data, 1, 12));
    }
};

document.addEventListener("DOMContentLoaded", fetchProducts);