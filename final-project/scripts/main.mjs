const menuButton = document.querySelector("#menu-button");
const navMenu = document.querySelector("#nav-menu");
const currentYear = document.querySelector("#current-year");
const lastModified = document.querySelector("#last-modified");
const navLinks = document.querySelectorAll("#nav-menu a");

if (menuButton && navMenu) {
  menuButton.addEventListener("click", () => {
    navMenu.classList.toggle("open");
    menuButton.classList.toggle("open");

    const isOpen = navMenu.classList.contains("open");
    menuButton.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu"
    );
  });
}

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

if (lastModified) {
  lastModified.textContent = document.lastModified;
}

navLinks.forEach((link) => {
  if (link.href === window.location.href) {
    link.classList.add("active");
  }
});