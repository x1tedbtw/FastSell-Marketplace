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
    const offerImage = document.querySelector(".offer-image");
    const productName = document.querySelector(".product-name");
    const price = document.querySelector(".price");
    const description = document.querySelector(".product-description");

    offerImage.src = offerData.images[0].image;
    productName.textContent = offerData.title;
    price.textContent = `Price: ${offerData.price} zł`;
    description.textContent = offerData.description;
}

function buyOffer(offerId) {
    alert(`Offer with ID ${offerId} has been bought!`);
}

document.addEventListener("DOMContentLoaded", main);