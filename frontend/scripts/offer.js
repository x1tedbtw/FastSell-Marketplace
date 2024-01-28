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
    const fistName = document.querySelector(".first-name")
    const secondName = document.querySelector(".second-name")
    const email = document.querySelector(".email")
    const address = document.querySelector(".address")
    const price = document.querySelector(".price");
    const description = document.getElementById("product-description");

    offerImage.src = offerData.images[0].image;
    productName.textContent = offerData.title;
    fistName.textContent = offerData.fistName
    secondName.textContent = offerData.secondName
    email.textContent = offerData.email
    address.textContent = offerData.address
    price.textContent = `Price: ${offerData.price} zł`;
    description.textContent = offerData.description;
}

function buyOffer(offerId) {
    alert(`Offer with ID ${offerId} has been bought!`);
}

document.addEventListener("DOMContentLoaded", main);