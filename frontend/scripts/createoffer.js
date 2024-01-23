import "./components/AppHeader.js";
import { getToken } from "./auth.js";


function main() {
    document.getElementById("submit-button").addEventListener("click", saveOffer)
}

function saveOffer(){
    const create_offer_form = document.getElementById("createOfferForm");
    const offer_data = new FormData(create_offer_form);

    axios.post("/api/offers/", offer_data, {
        headers: {
            "Content-Type": "multipart/form-data",
            "Authorization":`Token ${getToken()}`
        }
    })
    .then((response) =>{
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

document.addEventListener("DOMContentLoaded", main);
