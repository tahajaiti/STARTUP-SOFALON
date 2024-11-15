let purchaseHistory = JSON.parse(localStorage.getItem("purchaseHistory")) || [];

let contactData = JSON.parse(localStorage.getItem("contact")) || [];

function parsePrice(priceString) {
    return parseFloat(priceString.replace(/[^0-9.-]+/g, ""));
}

let totalSales = 0;
let totalOrders = purchaseHistory.length;
let totalVisitors = new Set();

let totalMessages = 0;

purchaseHistory.forEach(purchase => {
    const price = parsePrice(purchase.totalPrice);
    totalSales += price;

    const customerID = purchase.costumerInfo.Email;
    totalVisitors.add(customerID);

    
});

document.querySelector("#valueTotal").textContent = `$${totalSales.toFixed(2)}`;
document.querySelector("#valueOrders").textContent = totalOrders;
document.querySelector("#valueVisitor").textContent = totalVisitors.size;
document.querySelector("#valueMessage").textContent = contactData.length;
