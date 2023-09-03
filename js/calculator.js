"use strict";

function addKeyBindings() {
  window.addEventListener("keyup", (event) => {
    let button = document.querySelector(
      `#btn-container button[data-key="${event.key.toLowerCase()}"]`,
    );
    if (button) {
      simulateClick(button);
    }
  });
}

function simulateClick(button) {
  button.classList.add("active");
  button.click();
  setTimeout(() => {
    button.classList.remove("active");
  }, 100);
}

function main() {
  addKeyBindings();
}

main();
