const TAXFEE = 0.25;

let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
let count = cartItems.length || 0;

const btn = document.querySelector('#checkoutBtn');

console.log(cartItems);

const loadStats = () => {
    const numberItems = document.querySelector("#itemsNum");
    const total = document.querySelector("#totalSum");
    const sum = document.querySelector("#sumItems");
    const tax = document.querySelector("#taxFee");


    numberItems.textContent = `${count} ITEMS`;

    const totalPrice = cartItems.reduce((total, item) => {
        const price = parseFloat(item.price.replace(/[^0-9.-]+/g, ""));
        return total + (price * item.quantity);
    }, 0);

    const taxAmount = totalPrice * TAXFEE;
    const subtotal = totalPrice - taxAmount;

    sum.textContent = `SUMMARY: ${subtotal.toFixed(2)}$`;
    tax.textContent = `DELIVERY TAX: ${taxAmount.toFixed(2)}$`;
    total.textContent = `TOTAL: ${totalPrice.toFixed(2)}$`;

    loadItems();
};


const loadItems = () => {
    const container = document.querySelector("#itemsContainer");
    container.innerHTML = ""; 

    cartItems.forEach(item => {
        const description = item.description.split(" ").slice(0, 10).join(" ") + "...";

        const newItem = document.createElement("div");
        newItem.className = "bg-white w-full flex flex-row";

        newItem.innerHTML = `
              <img
                class="w-1/3 object-cover h-full bg-white"
                src="${item.image}"
                alt="image" />
              <div class="w-full h-full flex flex-col justify-start p-2">
                <div class="flex justify-between">
                  <p class="text-2xl font-Mont">${item.title}</p>
                  <span id="removeItem"
                    class="icon-[iconamoon--trash-light] text-2xl cursor-pointer hover:bg-red-500 transition-all"></span>
                </div>
                <p class="text-gray-500 h-full font-Mont">${description}</p>
                <div class="flex justify-between flex-wrap">
                  <p class="font-bold font-Mont">${item.quantity}</p>
                  <p class="text-lBrown font-medium">${item.price}</p>
                </div>
              </div>
        `;

        container.appendChild(newItem);

        const removeBtn = newItem.querySelector("#removeItem");
        removeBtn.addEventListener("click", (e) => {
            e.preventDefault();
            removeItem(item.title);
        });
    });
};

const removeItem = (title) => {
    const itemIndex = cartItems.findIndex(item => item.title === title);
    if (itemIndex > -1) {
        cartItems.splice(itemIndex, 1);
        localStorage.setItem("cart", JSON.stringify(cartItems));

        count--;
        loadStats();
        loadItems(); 
    }
};

btn.addEventListener('click', (e) => {

    

})

document.addEventListener('DOMContentLoaded', loadStats);