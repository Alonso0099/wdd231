import { setupNavigation } from "./navigation.mjs";
import { places } from "../data/discover.mjs";

setupNavigation();

const discoverContainer = document.querySelector("#discover-container");
const visitorMessage = document.querySelector("#visitor-message");

displayVisitMessage();
displayPlaces();

function displayPlaces() {
  discoverContainer.innerHTML = "";

  places.forEach((place, index) => {
    const card = document.createElement("article");
    card.classList.add("discover-card", `area-${index + 1}`);

    card.innerHTML = `
      <h2>${place.name}</h2>
      <figure>
      <img src="images/${place.image}" alt="${place.name}" width="600" height="400" ${index === 0 ? 'fetchpriority="high"' : 'loading="lazy"'}>
      </figure>
      <address>${place.address}</address>
      <p>${place.description}</p>
      <button type="button">Learn More</button>
    `;

    discoverContainer.appendChild(card);
  });
}

function displayVisitMessage() {
  const lastVisit = localStorage.getItem("lastVisit");
  const currentVisit = Date.now();
  const oneDay = 1000 * 60 * 60 * 24;

  if (!lastVisit) {
    visitorMessage.textContent = "Welcome! Let us know if you have any questions.";
  } else {
    const daysBetweenVisits = Math.floor((currentVisit - Number(lastVisit)) / oneDay);

    if (daysBetweenVisits < 1) {
      visitorMessage.textContent = "Back so soon! Awesome!";
    } else if (daysBetweenVisits === 1) {
      visitorMessage.textContent = "You last visited 1 day ago.";
    } else {
      visitorMessage.textContent = `You last visited ${daysBetweenVisits} days ago.`;
    }
  }

  localStorage.setItem("lastVisit", currentVisit);
}