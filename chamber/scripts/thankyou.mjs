import { setupNavigation } from "./navigation.mjs";

setupNavigation();

const summary = document.querySelector("#application-summary");
const params = new URLSearchParams(window.location.search);

const firstName = params.get("firstName") || "Not provided";
const lastName = params.get("lastName") || "Not provided";
const email = params.get("email") || "Not provided";
const phone = params.get("phone") || "Not provided";
const organization = params.get("organization") || "Not provided";
const timestamp = params.get("timestamp");

let submittedDate = "Not provided";

if (timestamp) {
  submittedDate = new Date(timestamp).toLocaleString("en-US", {
    dateStyle: "long",
    timeStyle: "short"
  });
}

summary.innerHTML = `
  <p><strong>First Name:</strong> ${firstName}</p>
  <p><strong>Last Name:</strong> ${lastName}</p>
  <p><strong>Email:</strong> ${email}</p>
  <p><strong>Mobile Phone:</strong> ${phone}</p>
  <p><strong>Business/Organization:</strong> ${organization}</p>
  <p><strong>Submitted:</strong> ${submittedDate}</p>
`;