const EVENT_LIST = document.querySelector(".event__list");
const FORM_SUBMIT = document.querySelector("#submit-form");
const TITLE_INPUT = document.querySelector("#title");
const ARTISTS_INPUT = document.querySelector("#artist");
const IMAGE_INPUT = document.querySelector("#image");
const PRICE_INPUT = document.querySelector("#price");
const PRICE_VIP_INPUT = document.querySelector("#priceVip");
const DATE_INPUT = document.querySelector('#date');
const PLACE_INPUT = document.querySelector('#place');

const BASE_URL = "http://localhost:3000";

renderEvents();

FORM_SUBMIT.addEventListener('click', async (e) => {
    e.preventDefault();
    let objectsUndefined = 0
    const data = {
        title: TITLE_INPUT.value,
        artists: ARTISTS_INPUT.value,
        image: IMAGE_INPUT.value,
        priceDefault: PRICE_INPUT.value,
        priceVip: PRICE_VIP_INPUT.value,
        date: DATE_INPUT.value,
        place: PLACE_INPUT.value
    }
    
    for (let index = 1; index < Object.keys(data).length; index++) {
        if ((data[Object.keys(data)[index]]).trim() === "" ) {
            objectsUndefined++
            window.alert('Some field is empty')
            break
        }
    }
    if (objectsUndefined == 0) {
        await postEvent(data)
    }
})

async function getEvents() {
    const response = await fetch(`${BASE_URL}/events`);
    const events = await response.json()
    return events
}

async function postEvent(data) {
    const rawResponse = await fetch(`${BASE_URL}/events`, {
        method: 'POST',
        headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(data)
    });

    const content = await rawResponse.json();
}

async function deleteEvent(id) {
    const rawResponse = await fetch(`${BASE_URL}/events/${id}`, {
        method: 'DELETE'
    });
    const content = await rawResponse.json();
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
        const eventDivInputs = document.createElement('div');

        const eventTitle = document.createElement('input');
        const eventArtists = document.createElement('input');
        const eventImageLink = document.createElement('input');
        const eventPriceDefault = document.createElement('input');
        const eventPriceVip = document.createElement('input');
        const eventDate = document.createElement('input');
        const eventPlace = document.createElement('input');
        const editButton = document.createElement('button');
        const deleteButton = document.createElement('button');

        eventDiv.setAttribute('id', 'eventDiv' + id);
        editButton.setAttribute('id', 'edit' + id);
        deleteButton.setAttribute('id', 'delete' + id);

        eventTitle.value = title;
        eventArtists.value = artists;
        eventImageLink.value = image;
        eventPriceDefault.value = priceDefault;
        eventPriceVip.value = priceVip;
        eventDate.value = date;
        eventPlace.value = place;
        editButton.innerHTML = 'Edit';
        deleteButton.innerHTML = 'Delete';

        eventTitle.readOnly = true;
        eventArtists.readOnly = true;
        eventImageLink.readOnly = true;
        eventPriceDefault.readOnly = true;
        eventPriceVip.readOnly = true;
        eventDate.readOnly = true;
        eventPlace.readOnly = true;

        eventDivInputs.appendChild(eventTitle);
        eventDivInputs.appendChild(eventArtists);
        eventDivInputs.appendChild(eventImageLink);
        eventDivInputs.appendChild(eventPriceDefault);
        eventDivInputs.appendChild(eventPriceVip);
        eventDivInputs.appendChild(eventDate);
        eventDivInputs.appendChild(eventPlace);
        eventDivInputs.appendChild(editButton);
        eventDivInputs.appendChild(deleteButton);

        eventDiv.appendChild(eventDivInputs);

        editButton.addEventListener('click', (e) => {
            if (editButton.innerHTML == 'Save') {
                const data = {
                    title: eventTitle.value,
                    artists: eventArtists.value,
                    image: eventImageLink.value,
                    priceDefault: eventPriceDefault.value,
                    priceVip: eventPriceVip.value,
                    date: eventDate.value,
                    place: eventPlace.value
                }
                putEvent(data, id)
            }
            if (editButton.innerHTML == 'Edit') {
                console.log('Entrou aqui');
                editButton.innerHTML = 'Save';
                eventTitle.readOnly = false;
                eventArtists.readOnly = false;
                eventImageLink.readOnly = false;
                eventPriceDefault.readOnly = false;
                eventPriceVip.readOnly = false;
                eventDate.readOnly = false;
                eventPlace.readOnly = false;
            }
        })

        deleteButton.addEventListener('click', () => {
            const question = confirm(`Do you really want to delete Event with id ${id}?`)
            if (question) {
                deleteEvent(id);
            }
        })

        EVENT_LIST.appendChild(eventDiv);
    });
}

async function putEvent(data, id) {
    const rawResponse = await fetch(`${BASE_URL}/events/${id}`, {
        method: 'PUT',
        headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(data)
    });
    const content = await rawResponse.json();
}


