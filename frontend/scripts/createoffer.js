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


function populateSubcategories() {
        var categorySelect = document.getElementById("category");
        var subcategorySelect = document.getElementById("subcategory");
        subcategorySelect.innerHTML = "";

        switch (categorySelect.value) {
            case "category1":
                addOption(subcategorySelect, "subcategory1", "Motor Subcategory 1");
                addOption(subcategorySelect, "subcategory2", "Motor Subcategory 2");
                addOption(subcategorySelect, "subcategory3", "Motor Subcategory 3");
                break;
            case "category2":
                addOption(subcategorySelect, "subcategory4", "Real Estate Subcategory 1");
                addOption(subcategorySelect, "subcategory5", "Real Estate Subcategory 2");
                addOption(subcategorySelect, "subcategory6", "Real Estate Subcategory 3");
                addOption(subcategorySelect, "subcategory7", "Real Estate Subcategory 4");
                break;
            case "category3":
                addOption(subcategorySelect, "subcategory8", "Home subcategoty")
            default:/* DOBAWLYAEM SUDA CATEGORII TOWAROW*/
                break;
        }
    }

    function addOption(select, value, text) {
        var option = document.createElement("option");
        option.value = value;
        option.text = text;
        select.add(option);
    }


    populateSubcategories();
