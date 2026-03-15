
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

function sendTime(jsonData) {

    const dateTime = jsonData.formatted;
    const zoneName = jsonData.zoneName;
    const abbreviation = jsonData.abbreviation;

    /*Ta fram tid och tidszon, skicka vidare */

    addTime(dateTime, zoneName, abbreviation);
}


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