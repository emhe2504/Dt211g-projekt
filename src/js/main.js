import { searchInfo } from "./search.js";
import { closeInfo } from "./fetch.js";

document.addEventListener("DOMContentLoaded", init);

const search = document.getElementById("search-spot");

function init() {
    searchInfo();
    closeInfo();

    search.addEventListener("input", () => {
        wrong.classList.add("is_hidden");
    })
}