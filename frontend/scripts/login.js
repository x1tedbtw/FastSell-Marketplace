import { saveToken } from "./auth.js";
import "./components/AppHeader.js";


function main() {
    document.getElementById("submit-button").addEventListener("click", login);
}

function login() {
    const login_form = document.getElementById("login-form");
    const form_data = new FormData(login_form);

    const request_data = {};

    form_data.forEach((value, i) => {
        request_data[i] = value;
    });

    if (!validate_data(request_data)) return;

    axios.post("/api/login/", request_data)
    .then((response) => {
        saveToken(response.data.auth_token);
        window.location.href = "/";
    })
    .catch((error) => {
        for (let prop in error.response.data) {
            if (Object.prototype.hasOwnProperty.call(error.response.data, prop)) {
                alert(error.response.data[prop]);
            }
        }
    });
}

function validate_data(data) {
    if (!data.username.trim()) {
        alert("Username field cannot be empty");
        return false;
    }

    if (!data.password.trim()) {
        alert("Password field cannot be empty");
        return false;
    }

    return true;
}

document.addEventListener("DOMContentLoaded", main);
