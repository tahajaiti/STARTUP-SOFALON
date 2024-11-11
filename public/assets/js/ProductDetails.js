let ProductDetails = document.getElementById('ProductDetails');
let data = null;

const params = new URLSearchParams(window.location.search);
const productId = params.get('id');

console.log('P ID :', productId);