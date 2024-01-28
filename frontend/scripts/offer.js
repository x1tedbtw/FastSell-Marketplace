import "./components/AppHeader.js";
import { getToken } from "./auth.js";

function main() {
    const urlParams = new URLSearchParams(window.location.search);
    const offerId = urlParams.get("id");

    getOfferDetails(offerId)
        .then((offerData) => {
            displayOfferDetails(offerData);
            document.getElementById("buy-button").addEventListener("click", () => buyOffer(offerId));
        })
        .catch((error) => {
            console.error("Error fetching offer details:", error);
        });
}

function getOfferDetails(offerId) {
    return axios.get(`/api/offers/${offerId}`)
        .then((response) => response.data)
        .catch((error) => {
            console.error("Error fetching offer details:", error);
            throw error;
        });
}

function displayOfferDetails(offerData) {
    const offerImage = document.getElementById("offer-image");
    const productName = document.getElementById("product-name");
    const fistName = document.getElementById("first-name");
    const secondName = document.getElementById("second-name");
    const email = document.getElementById("email");
    const phone_number = document.getElementById("phone_number");
    const address = document.getElementById("address");
    const price = document.getElementById("price");;
    const description = document.getElementById("product-description");

    offerImage.src = offerData.images[0].image;
    productName.textContent = offerData.title;
    fistName.textContent = offerData.owner.first_name;
    secondName.textContent = offerData.owner.second_name;
    email.textContent = offerData.owner.email;
    phone_number.textContent = offerData.owner.phone_number;
    address.textContent = offerData.owner.location.city;
    price.textContent = `Price: ${offerData.price} zł`;
    description.textContent = offerData.description;
}

function buyOffer(offerId) {
    alert(`Offer with ID ${offerId} has been bought!`);
}

document.addEventListener("DOMContentLoaded", main);