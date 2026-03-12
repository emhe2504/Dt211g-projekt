import { searchInfo } from "./search.js";
import { getTime } from "./nextFetch.js";

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

export function printInfo(jsonData, value) {

    const countryInfo = jsonData.find(data => data.name.common === value);

    if (countryInfo) {
        const country = countryInfo.name.common;

        const infoSpot = document.getElementById("result-section");
        const nameSpot = document.getElementById("nameSpot");
        const flagSpot = document.getElementById("flagSpot");
        const restSpot = document.getElementById("restOfInfo");

        nameSpot.innerHTML = "";
        flagSpot.innerHTML = "";
        restSpot.innerHTML = "";

        infoSpot.classList.remove("is_hidden");

        nameSpot.innerHTML = `<h3>${country}</h3>`;


        const flag = countryInfo.flags.png;
        const img = document.createElement("img");
        img.src = flag;
        img.alt = `${country}s flagga`;
        flagSpot.appendChild(img);


        const capital = countryInfo.capital[0];
        const capitalSpot = document.createElement("p");
        capitalSpot.textContent = `Capital: ${capital}`;
        restSpot.appendChild(capitalSpot);
        getTime(capital);


        const languages = countryInfo.languages;
        const langName = Object.values(languages);

        const languageSpot = document.createElement("p");
        languageSpot.textContent = `Language/Languages: ${langName}`;
        restSpot.appendChild(languageSpot);

        const currencies = countryInfo.currencies;
        const currName = Object.values(currencies);

        currName.forEach(curr => {
            const currancy = curr.name;
            const symbol = curr.symbol;

            const currencySpot = document.createElement("p");
            currencySpot.textContent = `Currency: ${currancy}, (Symbol: ${symbol})`;
            restSpot.appendChild(currencySpot);
        })

        const population = countryInfo.population;
        const popSpot = document.createElement("p");
        popSpot.textContent = `Population: ${population} people`;
        restSpot.appendChild(popSpot);

    }
}

export function closeInfo() {

    const infoSpot = document.getElementById("result-section");
    const closeButton = document.getElementById("close");

        closeButton.addEventListener("click", () => {
            infoSpot.classList.toggle("is_hidden");
        })
}