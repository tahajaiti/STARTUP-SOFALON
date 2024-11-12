let ProductDetails = document.getElementById('ProductDetails');
let data = null;
let q= 1;
const params = new URLSearchParams(window.location.search);
const productId = params.get('id');

    let mainImagee = document.getElementById('mainImagee');
    let var1 = document.getElementById('var1');
    let var2 = document.getElementById('var2');
    let var3 = document.getElementById('var3');
    let titleProduct = document.getElementById('titleProduct');
    let priceProduct = document.getElementById('priceProduct');
    let descriptionProduct = document.getElementById('descriptionProduct');
    let Qnt = document.getElementById('Qnt');
    let plus = document.getElementById('plus');
    let minus = document.getElementById('minus');
    let SKU = document.getElementById('SKU');
    let category = document.getElementById('category');
    let stock = document.getElementById('stock');


console.log('P ID :', productId);

async function fetchProducts(){
    const response = await fetch('../../../products.json');
    data = await response.json();
    let dataProduct = data.products;
    let ProductToShow;
    for (let i = 0; i < dataProduct.length; i++) {
        if(dataProduct[i].id == productId){
            ProductToShow = dataProduct[i];
        }
    }
      mainImagee.src = ProductToShow.mainImage;
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
        thumbnail.addEventListener('click', function() {
            thumbnails.forEach(thmb => thmb.classList.remove('border', 'border-lBrown'));
            mainImagee.src = this.src;
            this.classList.add('border', 'border-lBrown');
        });
    });

    plus.addEventListener('click',function(){
        if(q<ProductToShow.stock){
            q+=1;
            Qnt.innerText = q;
        }
    })
    minus.addEventListener('click',function(){
        if(q>0){
            q-=1;
            Qnt.innerText = q;
        }
       
    })

}
fetchProducts();