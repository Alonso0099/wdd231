// This function controls the mobile navigation menu
export function setupNavigation() {
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
}