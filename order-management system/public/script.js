fetch("/orders")
.then(res=>res.json())
.then(data=>{

let table = document.getElementById("ordersTable");

data.forEach(order=>{
let row = `
<tr>
<td>${order.name}</td>
<td>${order.product_name}</td>
<td>${order.quantity}</td>
<td>${order.total_amount}</td>
<td>${order.order_date}</td>
</tr>
`;

table.innerHTML += row;
});

});

fetch("/highest-order")
.then(res=>res.json())
.then(data=>{
document.getElementById("highest").innerText =
data.name + " ordered " + data.product_name + " worth ₹" + data.total;
});

fetch("/active-customer")
.then(res=>res.json())
.then(data=>{
document.getElementById("active").innerText =
data.name + " (" + data.total_orders + " orders)";
});