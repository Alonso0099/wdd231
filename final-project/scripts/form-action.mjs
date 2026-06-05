const submittedPlan = document.querySelector("#submitted-plan");
const params = new URLSearchParams(window.location.search);

const planDetails = [
  {
    label: "Name",
    value: params.get("name")
  },
  {
    label: "Preferred Prep Day",
    value: params.get("prep-day")
  },
  {
    label: "Meal Count",
    value: params.get("meal-count")
  },
  {
    label: "Main Prep Focus",
    value: params.get("prep-focus")
  },
  {
    label: "Notes",
    value: params.get("notes")
  }
];

function formatValue(value) {
  if (!value) {
    return "Not provided";
  }

  return value.charAt(0).toUpperCase() + value.slice(1);
}

function displaySubmittedPlan() {
  submittedPlan.innerHTML = planDetails.map((item) => `
    <p><strong>${item.label}:</strong> ${formatValue(item.value)}</p>
  `).join("");
}

displaySubmittedPlan();