let ProductDetails = document.getElementById('ProductDetails');
const data = JSON.parse(localStorage.getItem("products")) || [];
let q = 1;

console.log(data);

const TAX = 0.25; //tax rate

let cartStorage = JSON.parse(localStorage.getItem("cart")) || [];
let counter = cartStorage.length || 0;

const params = new URLSearchParams(window.location.search);
const productId = params.get('id');

const mainImage = document.getElementById('mainImagee');
const var1 = document.getElementById('var1');
const var2 = document.getElementById('var2');
const var3 = document.getElementById('var3');
const titleProduct = document.getElementById('titleProduct');
const priceProduct = document.getElementById('priceProduct');
const priceremove = document.getElementById('priceremove');
const descriptionProduct = document.getElementById('descriptionProduct');
const Qnt = document.getElementById('Qnt');
const plus = document.getElementById('plus');
const minus = document.getElementById('minus');
const SKU = document.getElementById('SKU');
const category = document.getElementById('category');
const stock = document.getElementById('stock');


console.log('P ID :', productId);

function fetchProducts() {

    showLoading();

    setTimeout(() => {
        let ProductToShow;
        for (let i = 0; i < data.length; i++) {
            if (data[i].id == productId) {
                ProductToShow = data[i];
            }
        }
        mainImage.src = ProductToShow.mainImage;
        var1.src = ProductToShow.mainImage;
        var2.src = ProductToShow.images[0];
        var3.src = ProductToShow.images[1];
        let prc = `$${ProductToShow.price}`;
        let prcRemove = `$${ProductToShow.price * 2}`;
        titleProduct.innerText = ProductToShow.title;
        priceProduct.innerText = prc;
        priceremove.innerText = prcRemove;
        descriptionProduct.innerText = ProductToShow.description;
        Qnt.innerText = q;
        SKU.innerText = ProductToShow.SKU;
        stock.innerText = ProductToShow.stock;
        category.innerText = ProductToShow.category;




        let thumbnails = [var1, var2, var3];
        thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', function () {
                thumbnails.forEach(thumbnail => thumbnail.classList.remove('border', 'border-lBrown'));
                mainImage.src = this.src;
                this.classList.add('border', 'border-lBrown');
            });
        });

        plus.addEventListener('click', function () {
            if (q < ProductToShow.stock) {
                q += 1;
                Qnt.innerText = q;
            }
        })
        minus.addEventListener('click', function () {
            if (q > 1) {
                q -= 1;
                Qnt.innerText = q;
            }

        })

        hideLoading();
    }, 1500)

}
fetchProducts();

const addCartBtn = document.querySelector("#addCart");

addCart.addEventListener('click', () => {
    const existingItem = cartStorage.find(item => item.title === titleProduct.innerText);
    const stockAvailable = parseInt(stock.innerText, 10);
    const quantityToAdd = parseInt(q, 10);

    if (existingItem) {
        if (existingItem.quantity + quantityToAdd > stockAvailable) {
            alert('Max stock reached');
            return;
        } else {
            existingItem.quantity += quantityToAdd;
            localStorage.setItem("cart", JSON.stringify(cartStorage));
        }
    } else {
        counter++;
        const cartItem = {
            id: productId,
            title: titleProduct.textContent,
            description: descriptionProduct.textContent,
            price: priceProduct.textContent,
            quantity: quantityToAdd,
            image: var1.src,
        };

        cartStorage.push(cartItem);
        localStorage.setItem("cart", JSON.stringify(cartStorage));
    }

    loadNumber();
});

const loadNumber = () => {
    const number = document.querySelector("#cartNum");
    const menuNumber = document.querySelector("#cartMenuNum");
    const total = document.querySelector("#cartTotal");
    const sum = document.querySelector("#cartSum");
    const tax = document.querySelector("#cartTax");

    number.textContent = counter;
    menuNumber.textContent = `${counter} ITEMS`;

    const totalPrice = cartStorage.reduce((total, item) => {
        const price = parseFloat(item.price.replace(/[^0-9.-]+/g, ""));
        return total + (price * item.quantity);
    }, 0);

    const taxAmount = totalPrice * TAX;
    const subtotal = totalPrice - taxAmount;

    sum.textContent = `SUMMARY: ${subtotal.toFixed(2)}$`;
    tax.textContent = `DELIVERY TAX: ${taxAmount.toFixed(2)}$`;
    total.textContent = `TOTAL: ${totalPrice.toFixed(2)}$`;

    loadCartItem();
};


const loadCartItem = () => {
    const container = document.querySelector("#cartContainer");
    container.innerHTML = "";

    cartStorage.forEach(item => {
        const description = item.description.split(" ").slice(0, 15).join(" ") + "...";

        const newItem = document.createElement("div");
        newItem.className = "bg-white w-full h-1/5 flex flex-row";

        newItem.innerHTML = `
            <img class="w-1/3 p-4 object-cover h-full bg-white" src="${item.image}" alt="">
            <div class="w-full h-full flex flex-col justify-start p-2">
                <div class="flex justify-between">
                    <p id="itemTitle" class="text-2xl">${item.title}</p>
                    <span id="removeFromCart" class="icon-[iconamoon--trash-light] text-2xl cursor-pointer hover:bg-red-500 transition-all"></span>
                </div>
                <p class="text-gray-500 h-full">${description}</p>
                <div class="flex justify-between flex-wrap">
                    <p class="font-bold">QTY: ${item.quantity}</p>
                    <p class="text-lBrown font-medium">${item.price}</p>
                </div>
            </div>
        `;

        container.appendChild(newItem);

        const removeBtn = newItem.querySelector("#removeFromCart");
        removeBtn.addEventListener("click", (e) => {
            e.preventDefault();
            removeItemFromCart(item.title);
        });
    });
};

const removeItemFromCart = (title) => {
    const itemIndex = cartStorage.findIndex(item => item.title === title);
    if (itemIndex > -1) {
        cartStorage.splice(itemIndex, 1);
        localStorage.setItem("cart", JSON.stringify(cartStorage));

        counter--;
        loadNumber();
        loadCartItem();
    }
};

function showLoading() {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        loadingScreen.classList.remove('hidden');
    }
}

function hideLoading() {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        loadingScreen.classList.add('hidden');
    }
}