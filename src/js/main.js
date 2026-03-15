import { searchInfo } from "./search.js";
import { closeInfo } from "./fetch.js";

document.addEventListener("DOMContentLoaded", init);

const search = document.getElementById("search-spot");
const wrong = document.getElementById("wrong");

function init() {
    searchInfo();
    closeInfo();

    search.addEventListener("input", () => {
        wrong.classList.add("is_hidden");
    })
}