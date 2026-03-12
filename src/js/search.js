import { getInfo } from "./fetch.js";

export function searchInfo() {

    const searchPlace = document.getElementById("search-spot");
    const button = document.getElementById("search-button");

    button.addEventListener("click", () => {

        /*Ta ordet/orden i value, dela upp, stor första bokstav, resten små, sätt ihop */
        
        const value = searchPlace.value
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
            
        getInfo(value);
        searchPlace.value = "";
    });
}