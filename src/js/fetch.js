import { getTime } from "./nextFetch.js";
import { getWeather } from "./lastFetch.js";

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
 * Deklarera olika variabler för platser */

const infoSpot = document.getElementById("result-section");
const nameSpot = document.getElementById("nameSpot");
const flagSpot = document.getElementById("flagSpot");
const restSpot = document.getElementById("restOfInfo");
const destinations = document.getElementById("destination-section");
const search = document.getElementById("search-section");


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

        nameSpot.innerHTML = `<h3>${country}</h3>`;


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

        getTime(capital);   /*Anger stad till annat API för tid i huvustad */
        getWeather(capital); /*Anger stad till annat API för väder huvustad */


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

export function closeInfo() {

    const closeButton = document.getElementById("close");

    closeButton.addEventListener("click", () => {

        infoSpot.classList.toggle("is_hidden");

        if (infoSpot.classList.contains("is_hidden")) {
            destinations.classList.remove("is_hidden");
            search.scrollIntoView();
        }
    })
}