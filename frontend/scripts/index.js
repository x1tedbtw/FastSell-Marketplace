import "./components/AppHeader.js";
// scripts/index.js
// Get all offer elements
const offerElements = document.querySelectorAll('.offer');

// Loop through each offer element
offerElements.forEach(offerElement => {
    // Get the offer ID from the data attribute
    const offerId = offerElement.dataset.offerId;

    // Now you can use the offerId as needed (e.g., for further processing or handling)
    console.log(`Offer ID: ${offerId}`);
});
document.addEventListener("DOMContentLoaded", () => {
    const offerContainer = document.querySelector(".offers-container");

    // Fetch offers from the server (replace the URL with your actual API endpoint)
    axios.get("./api/offers")
        .then(response => {
            const offers = response.data;

            // Loop through offers and create offer elements
            offers.forEach(offer => {
                const offerElement = createOfferElement(offer);
                offerContainer.appendChild(offerElement);
            });
        })
        .catch(error => {
            console.error("Error fetching offers:", error);
        });
    function createOfferElement(offer) {
        const offerDiv = document.createElement("div");
        offerDiv.classList.add("offer");

        const offerLink = document.createElement("a");
        offerLink.href = `./api/offer/${offer.id}`; // Replace with the actual offer link

        const offerImage = document.createElement("img");
        offerImage.src = offer.imageUrl; // Replace with actual property name
        offerImage.alt = "Offer Image";

        const offerTitle = document.createElement("h2");
        offerTitle.textContent = offer.title; // Replace with actual property name

        const offerDescription = document.createElement("p");
        offerDescription.textContent = offer.description; // Replace with actual property name


        // Append elements to the offer link
        offerLink.appendChild(offerImage);
        offerLink.appendChild(offerTitle);
        offerLink.appendChild(offerDescription);

        // Append offer link and contact button to the offer div
        offerDiv.appendChild(offerLink);


        return offerDiv;
    }
});
