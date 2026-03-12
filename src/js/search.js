import { getInfo } from "./fetch.js";

export function searchInfo() {

    const searchPlace = document.getElementById("search-spot");
    const button = document.getElementById("search-button");

    button.addEventListener("click", () => {

        const value = searchPlace.value.charAt(0).toUpperCase() + searchPlace.value.slice(1).toLowerCase();
        getInfo(value);
        searchPlace.value = "";
    }); 
}