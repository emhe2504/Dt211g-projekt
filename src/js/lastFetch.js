
/**
 * Hämtar aktuell väderinformation för en huvudstad 
 * via openweathermap API.
 * @param {string} capital 
 * @returns {Promise<void>}
 */

export async function getWeather(capital) {

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