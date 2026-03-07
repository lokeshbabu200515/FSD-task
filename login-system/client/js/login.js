function login() {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const message = document.getElementById("message");

    if (email === "" || password === "") {
        message.style.color = "red";
        message.innerText = "❌ All fields are required";
        return;
    }

    fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    })
    .then(res => res.json())
    .then(data => {
        message.style.color = data.success ? "green" : "red";
        message.innerText = data.message;
    })
    .catch(() => {
        message.style.color = "red";
        message.innerText = "⚠ Server not responding";
    });
}