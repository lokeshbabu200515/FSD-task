const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.static("public"));

const db = mysql.createConnection({
host:"localhost",
user:"root",
password:"Root@123",
database:"orderdb"
});

db.connect(err=>{
if(err) throw err;
console.log("MySQL Connected");
});

app.get("/orders",(req,res)=>{

let query = `
SELECT c.name,p.product_name,o.quantity,
(p.price*o.quantity) AS total_amount,o.order_date
FROM orders o
JOIN customers c ON o.customer_id=c.customer_id
JOIN products p ON o.product_id=p.product_id
ORDER BY o.order_date DESC
`;

db.query(query,(err,result)=>{
if(err) throw err;
res.json(result);
});

});

app.get("/highest-order",(req,res)=>{

let query = `
SELECT c.name,p.product_name,(p.price*o.quantity) AS total
FROM orders o
JOIN customers c ON o.customer_id=c.customer_id
JOIN products p ON o.product_id=p.product_id
ORDER BY total DESC
LIMIT 1
`;

db.query(query,(err,result)=>{
if(err) throw err;
res.json(result[0]);
});

});

app.get("/active-customer",(req,res)=>{

let query = `
SELECT c.name, COUNT(o.order_id) AS total_orders
FROM customers c
JOIN orders o ON c.customer_id=o.customer_id
GROUP BY c.customer_id
ORDER BY total_orders DESC
LIMIT 1
`;

db.query(query,(err,result)=>{
if(err) throw err;
res.json(result[0]);
});

});

app.listen(3000,()=>{
console.log("Server running on port 3000");
});