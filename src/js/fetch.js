import { getTime } from "./nextFetch.js";
import { getWeather } from "./lastFetch.js";

/**
 * Tar emot sökord från sökruta och skickar vidare till (printInfo).
 * Fetchar landdata från API, samt skickar data från API
 * till funktion (printInfo)
 * @param {string} value - Sökord från sökruta
 * @returns {Promise<void>}
 */

export async function getInfo(value) {

    const link = `https://restcountries.com/v3.1/region/europe?fields=name,capital,flags,languages,currencies,population`;

    try {
        const linkData = await fetch(link);
        const jsonData = await linkData.json();

        printInfo(jsonData, value);
    }

    catch (error) {
        console.log(error);

        const errorSpot = document.getElementById("result-section");

        errorSpot.innerHTML = `
        <p>Problem att ladda informationen, prova gärna igen</p>`
    }
}

/**
 * Deklarera olika variabler för platser 
 * */

/** @type {HTMLElement} */
const infoSpot = document.getElementById("result-section"); // section för div:ar

/** @type {HTMLHeadElement} */
const nameSpot = document.getElementById("nameSpot"); // h3 för landnamn

/** @type {HTMLDivElement} */
const flagSpot = document.getElementById("flagSpot"); // div för flagga

/** @type {HTMLDivElement} */
const restSpot = document.getElementById("restOfInfo"); // div för resterande landinfo

/** @type {HTMLElement} */
const destinations = document.getElementById("destination-section"); // section med reseförslag

/** @type {HTMLDivElement} */
const start = document.getElementById("start-section"); // div med starttext



/**
 * Visar information om land utifrån användarens sökning
 * och restcountries API.
 * Skriver ut landnamn, flagga, huvudstad, språk, valuta
 * och population till skärmen.
 * Skickar huvudstad till funktioner med fetch för tid och väder.
 * @param {Object[]} jsonData - landdata från restcountries API
 * @param {string} value - sökord från sökruta
 */

export function printInfo(jsonData, value) {

    const countryInfo = jsonData.find(data => data.name.common === value);

    if (countryInfo) {
        const country = countryInfo.name.common;

        flagSpot.innerHTML = "";
        restSpot.innerHTML = "";

        infoSpot.classList.remove("is_hidden");

        if (!infoSpot.classList.contains("is_hidden")) {
            destinations.classList.add("is_hidden");
            infoSpot.scrollIntoView();
        }


        /*Skriv ut land */

        nameSpot.textContent = `${country}`;


        /*Skriv ut flagga */

        const flag = countryInfo.flags.png;
        const img = document.createElement("img");
        img.src = flag;
        img.alt = `Flag of ${country}`;
        flagSpot.appendChild(img);


        /*Skriv ut huvudstad */

        const capital = countryInfo.capital[0];
        const capitalSpot = document.createElement("p");
        capitalSpot.textContent = `Capital: ${capital}`;
        restSpot.appendChild(capitalSpot);

        getTime(capital);   /*Anger stad till annat API för tid i huvudstad */
        getWeather(capital); /*Anger stad till annat API för väder huvudstad */


        /*Skriv ut språk */

        const languages = countryInfo.languages;
        const langName = Object.values(languages).join(", ");

        const languageSpot = document.createElement("p");
        languageSpot.textContent = `Language/Languages: ${langName}`;
        restSpot.appendChild(languageSpot);


        /*Skriv ut valuta */

        const currencies = countryInfo.currencies;
        const currName = Object.values(currencies);

        currName.forEach(curr => {
            const currancy = curr.name;
            const symbol = curr.symbol;

            const currencySpot = document.createElement("p");
            currencySpot.textContent = `Currency: ${currancy}, (Symbol: ${symbol})`;
            restSpot.appendChild(currencySpot);
        })


        /*Skriv ut population */

        const population = countryInfo.population.toLocaleString();
        const popSpot = document.createElement("p");
        popSpot.textContent = `Population: ${population} people`;
        restSpot.appendChild(popSpot);

    } else {

        /*Om skriver fel eller inte kan hitta land */

        const wrong = document.getElementById("wrong");

        wrong.classList.remove("is_hidden");
        infoSpot.classList.add("is_hidden");

        if (infoSpot.classList.contains("is_hidden")) {
            destinations.classList.remove("is_hidden");
        }

    }
}

/**
 * Skapar eventlyssnare på stäng-kanppen,
 * döljer visad landinformation.
 */

export function closeInfo() {

    const closeButton = document.getElementById("close");

    closeButton.addEventListener("click", () => {

        infoSpot.classList.toggle("is_hidden");

        if (infoSpot.classList.contains("is_hidden")) {
            destinations.classList.remove("is_hidden");
            start.scrollIntoView();
        }
    })
}