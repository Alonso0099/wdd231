import { isFavorite, toggleFavorite } from "./storage.mjs";

const foodCards = document.querySelector("#food-cards");
const filterButtons = document.querySelectorAll(".filter-button");
const foodDialog = document.querySelector("#food-dialog");
const closeDialog = document.querySelector("#close-dialog");
const dialogDetails = document.querySelector("#dialog-details");
const foodCount = document.querySelector("#food-count");
const favoriteCount = document.querySelector("#favorite-count");

let foods = [];

async function getFoods() {
  try {
    const response = await fetch("data/foods.json");

    if (!response.ok) {
      throw new Error("Food data could not be loaded.");
    }

    foods = await response.json();
    displayFoods(foods);
  } catch (error) {
    foodCards.innerHTML = `
      <p class="error-message">
        Sorry, the food guide could not be loaded. Please try again later.
      </p>
    `;
    console.error(error);
  }
}

function displayFoods(foodList) {
  foodCards.innerHTML = "";

  updateGuideSummary(foodList);
  if (foodList.length === 0) {
    foodCards.innerHTML = `
        <p class="empty-message">
        No foods found in this category yet.
        </p>
    `;
    return;
}
  foodList.forEach((food) => {
    const card = document.createElement("article");
    card.classList.add("food-card");

    card.innerHTML = `
    <div class="food-card-header">
        <span class="category-tag">${capitalize(food.category)}</span>
        <span class="favorite-status">${isFavorite(food.id) ? "Saved ★" : "Not saved"}</span>
    </div>

    <h3>${food.name}</h3>

    <p><strong>Prep:</strong> ${food.prep}</p>
    <p><strong>Freezer Life:</strong> ${food.freezerLife}</p>

    <div class="card-actions">
        <button class="details-button" type="button" data-id="${food.id}">
        View Details
        </button>
        <button class="favorite-button" type="button" data-id="${food.id}">
        ${isFavorite(food.id) ? "★ Saved" : "☆ Save"}
        </button>
    </div>
    `;

    foodCards.appendChild(card);
  });

  addCardEventListeners();
}

function updateGuideSummary(foodList) {
  if (foodCount) {
    foodCount.textContent = foodList.length;
  }

  if (favoriteCount) {
    const savedButtons = foods.filter((food) => isFavorite(food.id));
    favoriteCount.textContent = savedButtons.length;
  }
}

function addCardEventListeners() {
  const detailsButtons = document.querySelectorAll(".details-button");
  const favoriteButtons = document.querySelectorAll(".favorite-button");

  detailsButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const foodId = Number(button.dataset.id);
      const selectedFood = foods.find((food) => food.id === foodId);
      openFoodDialog(selectedFood);
    });
  });

  favoriteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const foodId = Number(button.dataset.id);
      toggleFavorite(foodId);
      displayFoods(getCurrentFoodList());
    });
  });
}

function getCurrentFoodList() {
  const activeFilter = document.querySelector(".filter-button.active");

  if (!activeFilter) {
    return foods;
  }

  const category = activeFilter.dataset.category;

  if (category === "all") {
    return foods;
  }

  return foods.filter((food) => food.category === category);
}

function openFoodDialog(food) {
  if (!food) {
    return;
  }

  dialogDetails.innerHTML = `
    <h2>${food.name}</h2>
    <p><strong>Category:</strong> ${capitalize(food.category)}</p>
    <p><strong>Preparation:</strong> ${food.prep}</p>
    <p><strong>Freezer Life:</strong> ${food.freezerLife}</p>
    <p><strong>Best Use:</strong> ${food.bestUse}</p>
    <p><strong>Tip:</strong> ${food.tip}</p>
  `;

  foodDialog.showModal();
}

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    const category = button.dataset.category;

    if (category === "all") {
      displayFoods(foods);
    } else {
      const filteredFoods = foods.filter((food) => food.category === category);
      displayFoods(filteredFoods);
    }
  });
});

if (closeDialog) {
  closeDialog.addEventListener("click", () => {
    foodDialog.close();
  });
}

getFoods();