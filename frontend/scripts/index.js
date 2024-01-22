import "./components/AppHeader.js";


function main() {
    getOffers()
    .then((data) => {
        console.log(data);
    })
}

async function getOffers(category = null) {
    const category_url = category ? `?category=${category}` : "";
    return (await axios.get(`/api/offers/${category_url}`)).data;
}

document.addEventListener("DOMContentLoaded", main);
