let ProductDetails = document.getElementById('ProductDetails');
let data = null;
let q = 1;

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
const descriptionProduct = document.getElementById('descriptionProduct');
const Qnt = document.getElementById('Qnt');
const plus = document.getElementById('plus');
const minus = document.getElementById('minus');
const SKU = document.getElementById('SKU');
const category = document.getElementById('category');
const stock = document.getElementById('stock');


console.log('P ID :', productId);

async function fetchProducts() {
    const response = await fetch('../../../products.json');
    data = await response.json();
    let dataProduct = data.products;
    let ProductToShow;
    for (let i = 0; i < dataProduct.length; i++) {
        if (dataProduct[i].id == productId) {
            ProductToShow = dataProduct[i];
        }
    }
    mainImage.src = ProductToShow.mainImage;
    var1.src = ProductToShow.mainImage;
    var2.src = ProductToShow.images[0];
    var3.src = ProductToShow.images[1];
    let prc = `$${ProductToShow.price}`;
    titleProduct.innerText = ProductToShow.title;
    priceProduct.innerText = prc;
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

    number.textContent = counter;
    menuNumber.textContent = `${counter} ITEMS`;

    console.log(cartStorage);
    loadCartItem();
}

const loadCartItem = () => {
    const container = document.querySelector("#cartContainer");
    container.innerHTML = "";

    cartStorage.forEach(item => {
        const existingItem = [...container.children].find(
            child => child.querySelector("#itemTitle").innerText === item.title
        );

        if (existingItem) {
            const quantityElement = existingItem.querySelector("p.font-bold");
            quantityElement.innerText = `QTY: ${item.quantity}`;
        } else {

            const newItem = document.createElement("div");
            newItem.className = "bg-white w-full h-1/5 flex flex-row";

            const description = item.description.split(" ").slice(0, 15).join(" ") + "...";

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
                const itemTitle = newItem.querySelector("#itemTitle").innerText;
                const itemIndex = cartStorage.findIndex(item => item.title === itemTitle);
                if (itemIndex > -1) {
                    cartStorage.splice(itemIndex, 1);

                    localStorage.setItem("cart", JSON.stringify(cartStorage));

                    counter--;
                    loadNumber();
                    loadCartItem();
                }
            });
        }
    });
}
