const membersContainer = document.querySelector("#members-container");
const gridButton = document.querySelector("#grid-view");
const listButton = document.querySelector("#list-view");
const menuButton = document.querySelector("#menu-button");
const navMenu = document.querySelector("#nav-menu");

menuButton.addEventListener("click", () => {
  navMenu.classList.toggle("open");
  menuButton.classList.toggle("show");

  if (navMenu.classList.contains("open")) {
    menuButton.setAttribute("aria-label", "Close navigation menu");
  } else {
    menuButton.setAttribute("aria-label", "Open navigation menu");
  }
});

async function getMembers() {
  try {
    const response = await fetch("data/members.json");

    if (!response.ok) {
      throw new Error("Could not load member data.");
    }

    const members = await response.json();
    displayMembers(members);
  } catch (error) {
    membersContainer.innerHTML = `<p>Member information is currently unavailable.</p>`;
    console.error(error);
  }
}

function displayMembers(members) {
  membersContainer.innerHTML = "";

  members.forEach((member) => {
    const card = document.createElement("article");
    card.classList.add("member-card");

    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name} logo" loading="lazy">
      <div>
        <h2>${member.name}</h2>
        <p>${member.description}</p>
        <p><strong>Address:</strong> ${member.address}</p>
        <p><strong>Phone:</strong> ${member.phone}</p>
        <p><strong>Membership:</strong> ${getMembershipLevel(member.membership)}</p>
        <a href="${member.website}" target="_blank">Visit Website</a>
      </div>
    `;

    membersContainer.appendChild(card);
  });
}

function getMembershipLevel(level) {
  if (level === 3) return "Gold";
  if (level === 2) return "Silver";
  return "Member";
}

gridButton.addEventListener("click", () => {
  membersContainer.classList.add("grid-view");
  membersContainer.classList.remove("list-view");
});

listButton.addEventListener("click", () => {
  membersContainer.classList.add("list-view");
  membersContainer.classList.remove("grid-view");
});

getMembers();