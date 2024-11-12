let table = document.getElementById('table');
let data = null;
const addproduct = document.getElementById("addproduct");
const closee = document.getElementById("close");
const container = document.getElementById("container");


async function fetchProducts(){
    const response = await fetch('../../../products.json');
    data = await response.json();
   
    console.log("DATA : ",data);
      
    DisplayCards(data.products);
    
    

    function DisplayCards(products) {
        table.innerHTML = '';
         let statusColor;
        products.forEach(product => {

              if(product.stock === 0){
                statusColor = 'bg-red-200 text-red-600'
              }else{
                statusColor = 'bg-green-200 text-green-600'
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
                            <span class=" ${statusColor} px-3 py-1 rounded-full text-xs">in stock</span>
                        </td>
                        <td class="py-4 px-6 flex gap-2">
                            <span class="icon-[material-symbols--delete-outline] text-red-500 text-2xl"></span>
                            <span class="icon-[lucide--edit] text-[20px] text-blue-500"></span>
                        </td>
                        </tr>
                     `
        });
    }

}
fetchProducts();


addproduct.addEventListener("click", function(){
    container.style.display = 'block';
})
closee.addEventListener('click',function(){
    container.style.display = 'none';
})