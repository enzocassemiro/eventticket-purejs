const EVENTS = document.querySelector(".events");

const BASE_URL = "http://localhost:3000";


renderEvents();

async function getEvents() {
    const response = await fetch(`${BASE_URL}/events`);
    const events = await response.json()
    return events
}

async function renderEvents() {
    const events = await getEvents();
    events.forEach(event => {
        const { id,
            title,
            artists,
            image,
            priceDefault,
            priceVip,
            date,
            place } = event
    
        const eventDiv = document.createElement('div');
        const eventImage = document.createElement('img');
        const eventTitle = document.createElement('h3');
        const eventArtists = document.createElement('p');
        const eventPlace = document.createElement('p');
        const eventPriceStart = document.createElement('p');
    
        //Estilos
    
        //Valores
        eventImage.src = image

        // atribuir na event div
        eventDiv.appendChild(eventImage);

        EVENTS.appendChild(eventDiv);
    });
}