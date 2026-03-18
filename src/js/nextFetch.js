

/**
 * Använder namn på huvudstad och
 * tar fram API med aktuell tidsinformation från huvudstaden.
 * @param {string} capital 
 * @returns {Promise<void>}
 */
export async function getTime(capital) {

    const APIkey = "7N7ARBIB953X";
    const link = `https://api.timezonedb.com/v2.1/get-time-zone?key=${APIkey}&format=json&by=zone&zone=Europe/${capital}`;

    
    try {

        const linkData = await fetch(link);
        const jsonData = await linkData.json();

        sendTime(jsonData);

    } catch(error) {

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

    if(!dateTime) {

        timeSpot.innerHTML = `<p>Date and time in capital: Can't find time</p>`;
        timeZoneSpot.textContent = `Timezone: Can't find timezone`;
    }

       if(!zoneName || !abbreviation) {

        timeZoneSpot.textContent = `Timezone: Can't find timezone`;
        timeSpot.appendChild(timeZoneSpot);
    }
}