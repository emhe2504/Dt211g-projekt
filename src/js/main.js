import { searchInfo } from "./search.js";
import { closeInfo } from "./fetch.js";

document.addEventListener("DOMContentLoaded", init);

function init() {
    searchInfo();
    closeInfo();
}