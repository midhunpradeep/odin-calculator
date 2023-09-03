"use strict";

const displayElement = document.getElementById("display");
const displayValues = {
  firstNumber: null,
  operator: null,
  secondNumber: null,
};

function updateDisplay() {
  if (displayValues.firstNumber === null) {
    displayElement.classList.add("empty");
    displayElement.textContent = "0";
    return;
  }

  displayElement.classList.remove("empty");
  displayElement.textContent = displayValues.firstNumber;
  if (displayValues.operator === null) return;
  displayElement.textContent += " " + displayValues.operator;
  if (displayValues.secondNumber === null) return;
  displayElement.textContent += " " + displayValues.secondNumber;
}

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
  updateDisplay();
}

main();
