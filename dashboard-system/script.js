let students = [
{name:"Arjun", department:"CSE", date:"2023-01-10"},
{name:"Ravi", department:"ECE", date:"2022-11-05"},
{name:"Meena", department:"CSE", date:"2024-02-20"},
{name:"Kiran", department:"MECH", date:"2023-07-12"},
{name:"Divya", department:"ECE", date:"2022-09-15"}
];

function displayTable(data){

let body = document.getElementById("tableBody");
body.innerHTML="";

data.forEach(s=>{
let row = `<tr>
<td>${s.name}</td>
<td>${s.department}</td>
<td>${s.date}</td>
</tr>`;

body.innerHTML += row;
});

countDepartments(data);
}

function sortByName(){
students.sort((a,b)=>a.name.localeCompare(b.name));
displayTable(students);
}

function sortByDate(){
students.sort((a,b)=>new Date(a.date)-new Date(b.date));
displayTable(students);
}

function filterDepartment(){

let dept = document.getElementById("departmentFilter").value;

if(dept=="All"){
displayTable(students);
}
else{
let filtered = students.filter(s=>s.department==dept);
displayTable(filtered);
}

}

function countDepartments(data){

let counts = {};

data.forEach(s=>{
counts[s.department] = (counts[s.department]||0)+1;
});

let list = document.getElementById("countList");
list.innerHTML="";

for(let dept in counts){
list.innerHTML += `<li>${dept} : ${counts[dept]}</li>`;
}

}

displayTable(students);