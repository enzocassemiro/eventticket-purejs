const EVENTS = document.querySelector(".events__cards");

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
        const imageDiv = document.createElement('div');
        const titleDiv = document.createElement('div');
        const artistsDiv = document.createElement('div');
        const placeDiv = document.createElement('div');
        const dateDiv = document.createElement('div');
        const priceDiv = document.createElement('div');


        const eventImage = document.createElement('img');
        const eventTitle = document.createElement('h3');
        const eventArtists = document.createElement('p');
        const eventPlace = document.createElement('p');
        const eventDate = document.createElement('p');
        const eventPriceStart = document.createElement('p');
    
        eventDiv.classList.add('event__card');
        imageDiv.classList.add('card__image');
        titleDiv.classList.add('card__title');
        artistsDiv.classList.add('card__artist');
        dateDiv.classList.add('card__date');
        placeDiv.classList.add('card__place');
        priceDiv.classList.add('card__price');

        eventImage.classList.add('image__img');
        eventTitle.classList.add('title__text');
        eventPlace.classList.add('place__text')

        eventImage.src = image;
        eventTitle.innerHTML = title;
        eventArtists.innerHTML = artists;
        eventDate.innerHTML = date;
        eventPlace.innerHTML = place;
        eventPriceStart.innerHTML = `Starts at: U$${priceDefault}`;

        imageDiv.appendChild(eventImage);
        titleDiv.appendChild(eventTitle);
        artistsDiv.appendChild(eventArtists);
        dateDiv.appendChild(eventDate);
        placeDiv.appendChild(eventPlace);
        priceDiv.appendChild(eventPriceStart);

        eventDiv.appendChild(imageDiv);
        eventDiv.appendChild(titleDiv);
        eventDiv.appendChild(artistsDiv);
        eventDiv.appendChild(dateDiv);
        eventDiv.appendChild(placeDiv);
        eventDiv.appendChild(priceDiv);

        EVENTS.appendChild(eventDiv);
    });
}