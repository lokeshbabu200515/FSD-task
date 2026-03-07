const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Root@123",   // 🔴 CHANGE if your MySQL password is different
    database: "login_system"
});

db.connect(err => {
    if (err) {
        console.error("❌ MySQL connection failed:", err.message);
        return;
    }
    console.log("✅ MySQL Connected");
});

module.exports = db;