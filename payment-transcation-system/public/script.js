function pay(){

let userId = document.getElementById("userId").value;
let merchantId = document.getElementById("merchantId").value;
let amount = document.getElementById("amount").value;

fetch("/pay",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({userId,merchantId,amount})
})
.then(res=>res.text())
.then(data=>{
document.getElementById("result").innerText=data;
});

}