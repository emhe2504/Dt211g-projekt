
/**
 * Använder namn på huvudstad och
 * tar fram API med aktuell tidsinformation från huvudstaden.
 * @param {string} capital 
 * @returns {Promise<void>}
 */
async function getTime(capital) {

    const APIkey = "7N7ARBIB953X";
    const link = `https://api.timezonedb.com/v2.1/get-time-zone?key=${APIkey}&format=json&by=zone&zone=Europe/${capital}`;


    try {

        const linkData = await fetch(link);
        const jsonData = await linkData.json();

        sendTime(jsonData);

    } catch (error) {

        console.log(error);
    }
}

/**
 * Tar aktuell tid samt tidszon från timeZone API
 * och skickar till addTime.
 * @param {Object} jsonData 
 */

function sendTime(jsonData) {

    const dateTime = jsonData.formatted;
    const zoneName = jsonData.zoneName;
    const abbreviation = jsonData.abbreviation;

    /*Ta fram tid och tidszon, skicka vidare */

    addTime(dateTime, zoneName, abbreviation);
}

/**
 * Skriver ut tid och tidszon till DOM.
 * @param {string} dateTime - aktuell tid och datum
 * @param {string} zoneName - namn på tidszon
 * @param {string} abbreviation - förkortning av tidszon
 */

function addTime(dateTime, zoneName, abbreviation) {

    const timeSpot = document.getElementById("timeSpot");

    timeSpot.innerHTML = `<p>Date and time in capital: ${dateTime}</p>`;

    const timeZoneSpot = document.createElement("p");
    timeZoneSpot.textContent = `Timezone: ${zoneName}, ${abbreviation}`;
    timeSpot.appendChild(timeZoneSpot);

    if (!dateTime) {

        timeSpot.innerHTML = `<p>Date and time in capital: Can't find time</p>`;
        timeZoneSpot.textContent = `Timezone: Can't find timezone`;
    }

    if (!zoneName || !abbreviation) {

        timeZoneSpot.textContent = `Timezone: Can't find timezone`;
        timeSpot.appendChild(timeZoneSpot);
    }
}




/**
 * Hämtar aktuell väderinformation för en huvudstad 
 * via openweathermap API.
 * @param {string} capital 
 * @returns {Promise<void>}
 */

async function getWeather(capital) {

    const APIkey = "ee3605817a74d55e0c0111a618e04922";
    const link = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${APIkey}&units=metric`;


    try {

        const linkData = await fetch(link);
        const jsonData = await linkData.json();

        sendWeather(jsonData, capital);

    } catch (error) {

        console.log(error);
    }
}

/**
 * Tar aktuell temp, väder, väderbeskrivning och
 * väder-icon från openweathermap API
 * och skickar till addWeather. Skickar även
 * aktuell huvudstad.
 * @param {Object} jsonData
 * @param {string} capital 
 */

function sendWeather(jsonData, capital) {

    const temp = jsonData.main.temp;
    const weather = jsonData.weather[0].main;
    const description = jsonData.weather[0].description;
    const icon = jsonData.weather[0].icon;
    const iconURL = `https://openweathermap.org/img/wn/${icon}@2x.png`;

    addWeather(temp, description, weather, iconURL, capital);
}

/**
 * Skriver temp, väder, väderbeskrivning och
 * väder-icon till DOM.
 * @param {number} temp 
 * @param {string} description 
 * @param {string} weather 
 * @param {string} iconURL 
 * @param {string} capital 
 */

function addWeather(temp, description, weather, iconURL, capital) {

    const tempSpot = document.getElementById("tempSpot");

    tempSpot.innerHTML = `<p>Temperature in ${capital}: ${temp} degrees.</p>`;

    const weatherSpot = document.createElement("p");
    weatherSpot.textContent = `Weather right now: ${weather}, ${description}.`;
    tempSpot.appendChild(weatherSpot);

    const img = document.createElement("img");
    img.src = iconURL;
    img.alt = `Weather-icon`;
    tempSpot.appendChild(img);

    if (temp === null) {

        tempSpot.innerHTML = `<p>Weather in capital: Can't find weather</p>`;
    }

    if (!description || !weather) {

        weatherSpot.textContent = `Weather right now: Missing info`;
    }
}