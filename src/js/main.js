import { searchInfo } from "./search.js";
import { closeInfo } from "./fetch.js";
import { useKeyWords } from "./search.js";



document.addEventListener("DOMContentLoaded", init);


/** @type {HTMLInputElement} */
const search = document.getElementById("search-spot"); //Sökruta

/** @type {HTMLDivElement | null} */
const wrong = document.getElementById("wrong"); //Div med felmeddelande


/**
 * Anropar searchInfo och closeInfo.
 * Eventlyssnare som vid input i textruta 
 * döljer felmeddelande.
 */
function init() {
    searchInfo();
    closeInfo();
    useKeyWords();

    if (wrong) {
        search.addEventListener("input", () => {
            wrong.classList.add("is_hidden");
        });
    }
}