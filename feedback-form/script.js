// Highlight field on mouse hover
function highlight(field) {
    field.classList.add("highlight");
}

function removeHighlight(field) {
    field.classList.remove("highlight");
}

// Allow only letters for name
function validateText(event) {
    let char = String.fromCharCode(event.which);
    if (!/^[a-zA-Z ]+$/.test(char)) {
        event.preventDefault();
        alert("Only letters allowed!");
    }
}

// Simple email validation
function validateEmail(event) {
    let char = String.fromCharCode(event.which);
    if (!/^[a-zA-Z0-9@._-]+$/.test(char)) {
        event.preventDefault();
    }
}

// Double-click submit confirmation
function submitForm() {
    alert("Thank you! Your feedback has been submitted successfully 😊");
    document.getElementById("feedbackForm").reset();
}