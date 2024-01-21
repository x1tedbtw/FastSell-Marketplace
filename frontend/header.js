import { validateToken } from "./auth.js";

async function main() {
    if (!(await validateToken()));
    const header_first_button = document.getElementById("header-button1");
    const header_second_button = document.getElementById("header-button2");

    header_first_button.innerHTML = "Create Offer";
    header_first_button.setAttribute("href", "createoffer.html");

    header_second_button.innerHTML = "My Account";
    header_second_button.setAttribute("href", "myprofile.html");
}

document.addEventListener("DOMContentLoaded", main);
