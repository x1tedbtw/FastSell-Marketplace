import { saveToken } from "./auth.js";
import "./components/AppHeader.js";


function main() {
    document.getElementById("submit-button").addEventListener("click", register);
}

function register() {
    const registration_form = document.getElementById("registration-form");
    const form_data = new FormData(registration_form);
    
    const request_data = {};

    form_data.forEach((value, i) => {
        request_data[i] = value;
    });

    if (!validate_data(request_data)) return;
    delete validate_data.confirm_password;
    
    axios.post("/api/register/", request_data)
    .then((response) => {
        saveToken(response.data.token);
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
    
    if (!data.confirm_password.trim()) {
        alert("Confirm password field cannot be empty");
        return false;
    }

    if (data.password !== data.confirm_password) {
        alert("Passwords are not matching.");
        return false;
    }

    return true;
}

document.addEventListener("DOMContentLoaded", main);
