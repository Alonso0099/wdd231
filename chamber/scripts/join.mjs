import { setupNavigation } from "./navigation.mjs";

setupNavigation();

const timestamp = document.querySelector("#timestamp");
const organizationTitle = document.querySelector("#organization-title");
const modalButtons = document.querySelectorAll("[data-modal]");
const closeButtons = document.querySelectorAll(".close-modal");
const dialogs = document.querySelectorAll("dialog");

// Add the current date and time when the form loads
timestamp.value = new Date().toISOString();

// Validate the organization title field
organizationTitle.addEventListener("input", () => {
  const titlePattern = /^[A-Za-z -]{7,}$/;

  if (organizationTitle.value === "") {
    organizationTitle.setCustomValidity("");
  } else if (!titlePattern.test(organizationTitle.value)) {
    organizationTitle.setCustomValidity(
      "Use at least seven characters. Only letters, spaces, and hyphens are allowed."
    );
  } else {
    organizationTitle.setCustomValidity("");
  }
});

// Open the correct membership modal
modalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modalId = button.getAttribute("data-modal");
    const modal = document.querySelector(`#${modalId}`);

    modal.showModal();
  });
});

// Close the modal using the close button
closeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    button.closest("dialog").close();
  });
});

// Close the modal when clicking outside the modal box
dialogs.forEach((dialog) => {
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
      dialog.close();
    }
  });
});