import { searchInfo } from "./search.js";
import { closeInfo } from "./fetch.js";

document.addEventListener("DOMContentLoaded", init);

function init() {
    searchInfo();
    closeInfo();

    search.addEventListener("input", () => {
        wrong.classList.add("is_hidden");
    })
}