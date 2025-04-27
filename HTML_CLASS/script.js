// script.js
function checkPassword() {
    const password = document.getElementById("password").value;

    // Check for each condition and update classes
    document.getElementById("length").classList.toggle("valid", password.length >= 8);
    document.getElementById("length").classList.toggle("invalid", password.length < 8);

    document.getElementById("uppercase").classList.toggle("valid", /[A-Z]/.test(password));
    document.getElementById("uppercase").classList.toggle("invalid", !/[A-Z]/.test(password));

    document.getElementById("lowercase").classList.toggle("valid", /[a-z]/.test(password));
    document.getElementById("lowercase").classList.toggle("invalid", !/[a-z]/.test(password));

    document.getElementById("number").classList.toggle("valid", /[0-9]/.test(password));
    document.getElementById("number").classList.toggle("invalid", !/[0-9]/.test(password));

    document.getElementById("special").classList.toggle("valid", /[!@#$%^&*(),.?":{}|<>]/.test(password));
    document.getElementById("special").classList.toggle("invalid", !/[!@#$%^&*(),.?":{}|<>]/.test(password));
}
