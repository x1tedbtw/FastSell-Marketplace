import "./components/AppHeader.js";
import { getToken } from "./auth.js";

function main() {

    sync_fields();

}

function sync_fields() {
    axios.get("/api/myprofile/", {
            headers: {
                "Authorization": `Token ${getToken()}`
            }
        })
             .then((response) => {
                 console.log(response);

                const username_input = document.getElementById("username-input");
                username_input.setAttribute("value", response.data.username);

                const firstname_input = document.getElementById("firstname-input");
                firstname_input.setAttribute("value", response.data.first_name);

                const lastname_input = document.getElementById("lastname-input");
                lastname_input.setAttribute("value", response.data.last_name);

                const email_input = document.getElementById("email-input");
                email_input.setAttribute("value", response.data.email);

                const phone_input = document.getElementById("phone-input");
                phone_input.setAttribute("value", response.data.phone_number);
             })
             .catch((error) => {
                 alert("Server Error :(");
             });
}

document.addEventListener("DOMContentLoaded", main)
