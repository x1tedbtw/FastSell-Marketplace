function performSearch() {
    const searchTerm = document.getElementById("search-input").value;
    console.log("Search term: " + searchTerm);

}

document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('header nav');

    menuToggle.addEventListener('click', function () {
        nav.classList.toggle('show');
    });
});