import "./components/AppHeader.js";


function main() {
    document.getElementById("submit-button").addEventListener("click", saveOffer)
}

function saveOffer(){
    const create_offer_form = document.getElementById("createOfferForm");
    const formData = new FormData(create_offer_form);

    const offer_data = {};

    formData.forEach((value, key) => {
        offer_data[key] = value;
    });

    axios.post("/api/offers/", offer_data, {
        headers: {
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
