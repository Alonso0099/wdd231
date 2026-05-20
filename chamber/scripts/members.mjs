// Get the chamber members from the JSON file
export async function getMembers() {
  const response = await fetch("data/members.json");

  if (!response.ok) {
    throw new Error("Could not load member data.");
  }

  const members = await response.json();
  return members;
}

// Change the membership number into a word
export function getMembershipLevel(level) {
  if (level === 3) {
    return "Gold";
  } else if (level === 2) {
    return "Silver";
  } else {
    return "Member";
  }
}