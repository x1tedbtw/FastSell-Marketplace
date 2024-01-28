import "./components/AppHeader.js";

const offer_elements = [];
let selected_category = null;
let search_query = null;

function main() {
    const category_elements = [...document.getElementsByClassName("category-item")];
    category_elements.forEach((elem) => {
        elem.addEventListener("click", () => {
            selected_category = elem.children[1].innerHTML;
            populatePage();
        });
    });

    const search_bar = document.getElementById("search_text");
    search_bar.addEventListener("change", () => {
        search_query = search_bar.value;
        populatePage();
    });

    populatePage();
}

function clearElements() {
    offer_elements.forEach((elem) => elem.remove());
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
        offerLink.href = `offer.html?id=${data.id}`;

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

async function getOffers() {
    const category_url = selected_category ? `category=${selected_category}&` : "";
    const search_url = search_query ? `query=${search_query}&` : "";
    const query = `?${category_url}${search_url}`

    return (await axios.get(`/api/offers/${query}`)).data;
}

document.addEventListener("DOMContentLoaded", main);
