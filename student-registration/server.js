const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Root@123",
    database: "student_db"
});

db.connect(err => {
    if (err) {
        console.log("Database connection failed:", err);
    } else {
        console.log("Connected to MySQL");
    }
});

app.post("/register", (req, res) => {
    const { name, email, phone, course } = req.body;

    const sql = "INSERT INTO students (name, email, phone, course) VALUES (?, ?, ?, ?)";

    db.query(sql, [name, email, phone, course], (err, result) => {
        if (err) {
            res.json({ message: "Error registering student" });
        } else {
            res.json({ message: "Student registered successfully!" });
        }
    });
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
