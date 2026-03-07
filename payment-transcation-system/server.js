const express = require("express");
const mysql = require("mysql");
const app = express();

app.use(express.json());
app.use(express.static("public"));

const db = mysql.createConnection({
host:"localhost",
user:"root",
password:"Root@123",
database:"paymentdb"
});

db.connect(err=>{
if(err) throw err;
console.log("MySQL Connected");
});

app.post("/pay",(req,res)=>{

const {userId,merchantId,amount} = req.body;

db.beginTransaction(err=>{
if(err) throw err;

let deduct = "UPDATE users SET balance = balance - ? WHERE id = ?";

db.query(deduct,[amount,userId],(err,result)=>{

if(err){
return db.rollback(()=>{
res.send("Transaction Failed");
});
}

let add = "UPDATE merchants SET balance = balance + ? WHERE id = ?";

db.query(add,[amount,merchantId],(err,result)=>{

if(err){
return db.rollback(()=>{
res.send("Transaction Failed");
});
}

db.commit(err=>{
if(err){
return db.rollback(()=>{
res.send("Transaction Failed");
});
}

res.send("Payment Successful");
});

});

});

});

});

app.listen(3000,()=>{
console.log("Server running on port 3000");
});