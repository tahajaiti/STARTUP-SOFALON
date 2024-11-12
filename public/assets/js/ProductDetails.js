let ProductDetails = document.getElementById('ProductDetails');
let data = null;

const params = new URLSearchParams(window.location.search);
const productId = params.get('id');

console.log('P ID :', productId);

async function fetchProducts() {
    const response = await fetch('../../../products.json');
    data = await response.json();
    let dataProduct = data.products;
    let ProductToShow;
    for (let i = 0; i < dataProduct.length; i++) {
        if(dataProduct[i].id == productId){
            ProductToShow = dataProduct[i];
        }
    }
     
    ProductDetails.innerHTML = `
                    <div class="flex flex-col justify-end items-center md:items-start md:w-1/2 md:mr-8">
                    <div class="flex flex-col items-center self-end">
                        <div class="mainImage bg-whiteGrey mb-4 p-2">
                            <img id="mainImage" class="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-auto object-cover" src="${ProductToShow.mainImage}" alt="main image">
                        </div>

                        <div class="variableImages flex gap-4 justify-center mt-4">
                            <img id="var1" class="w-16 h-16 object-cover cursor-pointer" src="${ProductToShow.mainImage}" alt="variable Image">
                            <img id="var2" class="w-16 h-16 object-cover cursor-pointer" src="${ProductToShow.images[0]}" alt="variable Image">
                            <img id="var3" class="w-16 h-16 object-cover cursor-pointer" src="${ProductToShow.images[1]}" alt="variable Image">
                        </div>
                    </div>
                </div>

                <div class="md:w-1/2 md:pl-8 flex flex-col justify-start mt-4 md:mt-0">
                    <h2 class="text-4xl font-semibold mb-2">${ProductToShow.title}</h2>
                    <div class="flex items-center gap-2 text-lg mb-4 pb-8">
                        <span class="line-through text-SoftGray text-2xl">$300</span>
                        <span class="text-lBrown text-2xl">$${ProductToShow.price}</span>
                    </div>

                    <hr class="w-[80%] h-[1px] bg-SoftGray border-0">

                    <p class="text-SoftGray mb-6 w-[80%] pt-8">${ProductToShow.description}</p>

                    <div class="flex items-center gap-4 mb-4 pb-8">
                        <div class="flex items-center border border-SoftGray">
                            <p class="w-10 text-center pt-3 border border-SoftGray text-SoftGray h-[51px] focus:outline-none">1</p>
                            <div class="flex flex-col">
                                <button class="px-2 border border-SoftGray h-[25.5px] text-SoftGray">+</button>
                                <button class="px-2 border border-SoftGray h-[25.5px] text-SoftGray">-</button>
                            </div>
                        </div>
                        <button class="bg-lBrown w-[60%] text-white px-6 py-2 font-semibold h-[51px]">ADD TO CART</button>
                    </div>

                    <hr class="w-[80%] h-[1px] bg-SoftGray border-0">

                    <div class="text-sm text-SoftGray pt-8">
                        <p><strong class="text-gray">SKU:</strong> ${ProductToShow.SKU}</p>
                        <p><strong class="text-gray">Categories:</strong> ${ProductToShow.category}</p>
                        <p><strong class="text-gray">Stock:</strong> ${ProductToShow.stock}</p>
                    </div>
                </div>

    ` 
    let mainImage = document.getElementById('mainImage');
    let var1 = document.getElementById('var1');
    let var2 = document.getElementById('var2');
    let var3 = document.getElementById('var3');

    let thumbnails = [var1, var2, var3];
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            thumbnails.forEach(thmb => thmb.classList.remove('border', 'border-lBrown'));
            mainImage.src = this.src;
            this.classList.add('border', 'border-lBrown');
        });
    });

}
fetchProducts();