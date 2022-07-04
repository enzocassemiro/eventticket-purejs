const EVENTS = document.querySelector(".events__cards");
const FLAG = document.querySelector(".right__currency__value")
const USER_LOCALE =
  navigator.languages && navigator.languages.length
    ? navigator.languages[0]
    : navigator.language;

const BASE_URL = "http://localhost:3000";
const BASE_URL_COIN = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest";

renderEvents();

async function getEvents() {
    try {
        const response = await fetch(`${BASE_URL}/events`);
        if (response.ok) {
            const events = await response.json()
            return events
        } else{
            throw new Error('Network response was not ok.')
        }
    } catch (error) {
        try {
            const response = await fetch("db.json");
            if (response.ok){
                const events = await response.json()
                return events.events
            } else{
                throw new Error('Network response was not ok.')
            }
        } catch (error) {
            throw new Error('Network response was not ok.')
        }
    }
}

async function renderEvents() {
    const events = await getEvents();
    const currencies = await renderCurrency();
    const coin_char = currencies[0];
    const currencie = currencies[1];
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
        eventPriceStart.innerHTML = `Starts at: ${coin_char}$${(priceDefault*currencie).toFixed(2)}`;

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

async function renderCurrency() {
    const response = await fetch(`${BASE_URL_COIN}/currencies/usd.json`);
    const currencies = await response.json()
    const coin_char = "U"
    const multiplier = 1
    if (USER_LOCALE == "pt-BR") {
        FLAG.src = "assets/images/brazilFlag.png" 
        const coin_char = "R"
        const multiplier = currencies.usd.brl
        return [coin_char, multiplier]
    }
    return [coin_char, multiplier]
}