import "./components/AppHeader.js";


function main() {
    document.getElementById("submit-button").addEventListener("click", saveOffer)
}

function saveOffer(){
    const create_offer_form = document.getElementById("createOfferForm");
    const formData = new FormData(create_offer_form);

    const post_data = {};

    formData.forEach((value, key) => {
        post_data[key] = value;

    });

    axios.post("/api/offers/", post_data, {
        headers: {
            "Authorization":`Token ${getToken()} `
        }
    })
        .then((response) =>{
            console.log(response.data)
        })
        .catch((error) => {
            console.error(error)
        })

}
