let table = document.getElementById('table');
let data = null;
const addproduct = document.getElementById("addproduct");
const closee = document.getElementById("close");
const container = document.getElementById("container");
let pages = document.getElementById('pages');

let azArray;
async function fetchProducts(){
    const response = await fetch('../../../products.json');
    data = await response.json();
   
    console.log("DATA : ",data);
    azArray = [...data.products];
    currentPageN = Math.ceil(data.products.length / 12);
    DisplayCards(GFG(data.products, 1, 12));
    addPagination();

}
fetchProducts();

function GFG(array, currentPage, pageSize) {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return array.slice(startIndex, endIndex);
}

addproduct.addEventListener("click", function(){
    container.style.display = 'block';
})
closee.addEventListener('click',function(){
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

function ActivePage(activebtn) {
    const AllPage = document.querySelectorAll('#page');

    AllPage.forEach((page) => {
        page.classList.add('bg-white', 'border', 'border-SoftGray', 'text-gray');
        page.classList.remove('bg-lBrown', 'text-white');
    });
    activebtn.classList.add('bg-lBrown', 'text-white');
    activebtn.classList.remove('bg-white', 'border', 'border-SoftGray', 'text-gray');
}

function DisplayCards(products) {
    table.innerHTML = '';
     let statusColor;
     let status;
    products.forEach(product => {

          if(product.stock === 0){
            statusColor = 'bg-red-200 text-red-600';
            status = 'out stock';
          }else{
            statusColor = 'bg-green-200 text-green-600';
            status = 'in stock';
          }

        table.innerHTML += `
            <tr class="border-b hover:bg-gray-50">
                    <td class="py-4 px-6 flex items-center space-x-2">
                        <img src="${product.mainImage}" alt="Cherry Delight" class="h-8 w-8 rounded-full">
                        <span>Cherry Delight</span>
                    </td>
                    <td class="py-4 px-6 hidden sm:table-cell">${product.id}</td>
                    <td class="py-4 px-6 hidden sm:table-cell">$${product.price}</td>
                    <td class="py-4 px-6">${product.stock} pcs</td>
                    <td class="py-4 px-6 hidden sm:table-cell">${product.category}</td>
                    <td class="py-4 px-6">
                        <span class=" ${statusColor} px-3 py-1 rounded-full text-xs">${status}</span>
                    </td>
                    <td class="py-4 px-6 flex gap-2">
                        <span class="icon-[material-symbols--delete-outline] text-red-500 text-2xl"></span>
                        <span class="icon-[lucide--edit] text-[20px] text-blue-500"></span>
                    </td>
                    </tr>
                 `
    });
}
