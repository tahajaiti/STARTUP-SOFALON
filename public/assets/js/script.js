let card = document.getElementById('card');
async function fetchProducts() {
    const response = await fetch('../../../products.json'); 
    const data = await response.json();
    console.log(data.products[0].Beds);
    

    data.products[0].Beds.forEach(bed => {
        card.innerHTML += `
                  <div class="flex flex-col bg-white rounded-lg p-4 hover:shadow-lg transition-shadow duration-300 max-w-xs mx-auto ">
            <img id="mainImg" src="${bed.mainImage}" class="bg-whiteGrey p-2" alt="Product Image">
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
                    <p id="price" class="text-lBrown text-sm ml-auto">${bed.price}</p>
                </div>
                <p id="title" class="text-lg font-semibold mt-2">${bed.title}</p>
                <button class="bg-lBrown text-white py-1 rounded mt-2 border-2 border-transparent hover:bg-white hover:border-lBrown hover:text-lBrown transition-all duration-300">SEE DETAILS</button>
            </div>
        </div>
        `
    });
}

fetchProducts();
