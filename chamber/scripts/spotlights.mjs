import { getMembers, getMembershipLevel } from "./members.mjs";

// Display three random silver or gold members
export async function displaySpotlights() {
  const spotlightContainer = document.querySelector("#spotlight-container");

  try {
    const members = await getMembers();

    const qualifiedMembers = members.filter((member) => {
      return member.membership === 2 || member.membership === 3;
    });

    const randomMembers = qualifiedMembers
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    spotlightContainer.innerHTML = "";

    randomMembers.forEach((member) => {
      const card = document.createElement("article");
      card.classList.add("member-card");

      card.innerHTML = `
        <img src="images/${member.image}" alt="${member.name} logo" width="300" height="200" loading="lazy">
        <div>
          <h3>${member.name}</h3>
          <p>${member.address}</p>
          <p>${member.phone}</p>
          <p><strong>Membership:</strong> ${getMembershipLevel(member.membership)}</p>
          <a href="${member.website}" target="_blank" rel="noopener">Visit Website</a>
        </div>
      `;

      spotlightContainer.appendChild(card);
    });
  } catch (error) {
    spotlightContainer.innerHTML = "<p>Company spotlights are currently unavailable.</p>";
    console.error(error);
  }
}