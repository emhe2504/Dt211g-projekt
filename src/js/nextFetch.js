
export async function getTime(capital) {

    const link = `https://api.timezonedb.com/v2.1/get-time-zone?key=7N7ARBIB953X&format=json&by=zone&zone=Europe/${capital}`;

    
    try {

        const linkData = await fetch(link);
        const jsonData = await linkData.json();

        sendTime(jsonData);

    } catch(error) {

        console.log(error);
    }
}

function sendTime(jsonData) {

    const dateTime = jsonData.formatted;
    const zoneName = jsonData.zoneName;
    const abbreviation = jsonData.abbreviation;

    /*Ta fram tid och tidszon, skicka vidare */

    addTime(dateTime);
    addTimeZone(zoneName, abbreviation);
}


function addTime(dateTime) {

    const timeSpot = document.getElementById("timeSpot");

    timeSpot.innerHTML = "";
    timeSpot.innerHTML = `<p>Date and time in capital: ${dateTime}</p>`;

    if(!dateTime) {

        timeSpot.innerHTML = `<p>Date and time in capital: Can't find time</p>`;
    }
}


function addTimeZone(zoneName, abbreviation) {

    const timeZoneSpot = document.getElementById("timeZoneSpot");

    timeZoneSpot.innerHTML = "";
    timeZoneSpot.innerHTML = `<p>Timezone: ${zoneName}, ${abbreviation}</p>`;

    if(!zoneName || !abbreviation) {

        timeZoneSpot.innerHTML = `<p>Timezone: Can't find timezone</p>`;
    }
}