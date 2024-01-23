import "./components/AppHeader.js";

const offer_elements = [];

function main() {
    const category_elements = document.getElementsByClassName("category-item");
    category_elements.forEach((elem) => {
        elem.addEventListener("click", populatePage);
    });

    populatePage();
}

function clearElements() {
    offer_elements.forEach(document.querySelector(".offers-container").removeChild);
    offer_elements.length = 0;
}

function populatePage() {
    clearElements();

    getOffers()
    .then((data) => {
        data.forEach((offer_data) => {
            const offer_element = createOffer(offer_data);
            offer_elements.push(offer_element);
            document.querySelector(".offers-container").appendChild(offer_element);
        });
    })
    .catch((error) => {
        alert(`Server error: ${error.response.status}`);
    });
}

function createOffer(data) {
    const offerDiv = document.createElement("div");
        offerDiv.classList.add("offer");

        const offerLink = document.createElement("a");
        offerLink.href = `/api/offers/${data.id}`;

        const offerImage = document.createElement("img");
        offerImage.src = data.images[0].image;
        offerImage.alt = "Offer Image";

        const offerTitle = document.createElement("h2");
        offerTitle.textContent = data.title;

        const offerDescription = document.createElement("p");
        offerDescription.textContent = data.description;

        offerLink.appendChild(offerImage);
        offerLink.appendChild(offerTitle);
        offerLink.appendChild(offerDescription);

        offerDiv.appendChild(offerLink);

        return offerDiv;
}

async function getOffers(category = null) {
    const category_url = category ? `?category=${category}` : "";
    return (await axios.get(`/api/offers/${category_url}`)).data;
}

document.addEventListener("DOMContentLoaded", main);
