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

const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const country = document.getElementById('Country');
const state = document.getElementById('State');
const city = document.getElementById('City');
const address = document.getElementById('Adress');
const email = document.getElementById('Email');
const acceptPolicy = document.getElementById('acceptPolicy');


let costumerInfo = new Object();

btn.addEventListener('click', (e) => {
  e.preventDefault();

  if (cartItems.length === 0) {
    alert("no items in cart");
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!firstName.value || !lastName.value || !country.value || !state.value ||
    !city.value || !address.value || !acceptPolicy.checked) {

    alert("Fill the form and accept our privacy policy");
    return;
  }

  if (!emailRegex.test(email.value)) {
    alert("Enter a valid email adress");
    return;
  }

  costumerInfo = {
    Fname: firstName.value,
    Lname: lastName.value,
    Cphone: phone.value
  };


  const totalPrice = cartItems.reduce((total, item) => {
    const price = parseFloat(item.price.replace(/[^0-9.-]+/g, ""));
    return total + (price * item.quantity);
  }, 0);


  const purchaseData = {
    costumerInfo,
    items: cartItems,
    totalPrice: `TOTAL: ${totalPrice.toFixed(2)}$`
  };

  let purchaseHistory = JSON.parse(localStorage.getItem("purchaseHistory")) || [];
  purchaseHistory.push(purchaseData);
  localStorage.setItem("purchaseHistory", JSON.stringify(purchaseHistory));

  generatePDF(costumerInfo, cartItems, totalPrice);

  cartItems = [];
  localStorage.setItem("cart", JSON.stringify(cartItems));
  count = 0;
  loadStats();
});

document.addEventListener('DOMContentLoaded', loadStats);


function generatePDF(customer, items, totalPrice) {
  const invoiceContent = `
        <div class="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
            <div class="flex justify-between items-center border-b pb-4">
                <div>
                    <img class="pl-2 w-36" src="assets/images/logo.png" alt="COMPANY LOGO"/>
                </div>
            </div>
            
            <div class="flex justify-between mt-4">
                <div>
                    <p class="font-bold">SOFALO TO:</p>
                    <p class="text-gray-800 font-semibold">${customer.Fname} ${customer.Lname}</p>
                    <p class="text-gray-600">${customer.Cphone}</p>
                </div>
            </div>

            <div class="mt-6">
                <table class="w-full border-collapse">
                    <thead>
                        <tr class="bg-lBrown text-white">
                            <th class="p-2 text-left">Description</th>
                            <th class="p-2 text-left">Qty</th>
                            <th class="p-2 text-left">Price</th>
                            <th class="p-2 text-left">Total</th>
                        </tr>
                    </thead>
                    <tbody class="text-gray-700">
                        ${items.map(item => {
    const price = parseFloat(item.price.replace(/[^0-9.-]+/g, ""));
    const itemTotal = price * item.quantity;
    return `
                                <tr class="border-b">
                                    <td class="p-2">${item.title}</td>
                                    <td class="p-2">${item.quantity}</td>
                                    <td class="p-2">${price.toFixed(2)}$</td>
                                    <td class="p-2">${itemTotal.toFixed(2)}$</td>
                                </tr>
                            `;
  }).join('')}
                    </tbody>
                </table>
            </div>

            <div class="flex justify-between items-center mt-6 border-t pt-4">
                <div>
                    <p class="font-semibold text-lBrown">Thank you for your purchase!</p>
                </div>
                <div class="text-right">
                    <p class="text-gray-700">Total: <span class="font-bold">${totalPrice.toFixed(2)}$</span></p>
                </div>
            </div>
        </div>
    `;

  const element = document.createElement("div");
  element.innerHTML = invoiceContent;
  document.body.appendChild(element);

  html2pdf()
    .from(element)
    .save()
    .then(() => {
      document.body.removeChild(element);
    });
}
