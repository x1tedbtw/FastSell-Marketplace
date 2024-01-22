import "./components/AppHeader.js";
import { getToken } from "./auth.js";

function main() {

    sync_fields();
    setupSaveButtonListener();
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

function setupSaveButtonListener() {
    const saveChangesButton = document.getElementById("save-button");

    if (saveChangesButton) {
        saveChangesButton.addEventListener("click", function() {
            // Function to execute when the "Save changes" button is clicked
            saveChanges();
        });
    }
}

function saveChanges() {
    const DataToSave = {
        username: document.getElementById("username-input").value,
        first_name: document.getElementById("firstname-input").value,
        last_name: document.getElementById("lastname-input").value,
        email: document.getElementById("email-input").value,
        phone_number: document.getElementById("phone-input").value
    };

    axios.put("/api/myprofile/", DataToSave, {
            headers: {
                "Authorization": `Token ${getToken()}`
            }
        })
    .then((response) => {
        // Handle success
        console.log('Response:', response.data);
    })
    .catch((error) => {
        // Handle error
        console.error('Error:', error);
    });
}


document.addEventListener("DOMContentLoaded", main)
