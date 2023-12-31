"use strict";

const displayElement = document.getElementById("display");
const displayValues = {
  firstNumber: "",
  operator: null,
  secondNumber: "",
};

function updateDisplay() {
  if (displayValues.firstNumber === "" && displayValues.operator === null) {
    displayElement.classList.add("empty");
    displayElement.textContent = "0";
    return;
  }

  displayElement.classList.remove("empty");
  displayElement.textContent = displayValues.firstNumber;
  if (displayValues.operator === null) return;
  displayElement.textContent += " " + displayValues.operator;
  displayElement.textContent += " " + displayValues.secondNumber;
}

function addKeyBindings() {
  window.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      simulateClick(document.getElementById("equals"));
    }

    let button = document.querySelector(
      `#btn-container button[data-key="${event.key.toLowerCase()}"]`,
    );
    if (button) {
      simulateClick(button);
    }
  });
}

function addButtonEvents() {
  let buttonContainer = document.getElementById("btn-container");

  let numberButtons = buttonContainer.querySelectorAll(".number");
  for (const button of numberButtons) {
    button.addEventListener("click", () => {
      if (displayValues.operator === null) {
        // first number is still being edited
        if (displayValues.firstNumber === "0") {
          displayValues.firstNumber = ""; // prevent leading zeroes
        }
        displayValues.firstNumber += button.textContent;
      } else {
        if (displayValues.secondNumber === "0") {
          displayValues.secondNumber = "";
        }
        displayValues.secondNumber += button.textContent;
      }
      updateDisplay();
    });
  }

  let operatorButtons = buttonContainer.querySelectorAll(".operator");
  for (const button of operatorButtons) {
    button.addEventListener("click", (event) => {
      if (displayValues.firstNumber === "") {
        displayValues.firstNumber = "0";
      }

      if (displayValues.secondNumber === "") {
        displayValues.operator = button.textContent;
      } else {
        evaluateDisplayValues();
        displayValues.operator = button.textContent;
      }
      updateDisplay();
    });
  }

  buttonContainer.querySelector("#decimal").addEventListener("click", () => {
    if (displayValues.operator === null) {
      if (!displayValues.firstNumber.includes(".")) {
        if (displayValues.firstNumber === "") {
          displayValues.firstNumber = "0";
        }
        displayValues.firstNumber += ".";
      }
    } else {
      if (!displayValues.secondNumber.includes(".")) {
        if (displayValues.secondNumber === "") {
          displayValues.secondNumber = "0";
        }
        displayValues.secondNumber += ".";
      }
    }

    updateDisplay();
  });

  let equalsButton = buttonContainer.querySelector("#equals");
  equalsButton.addEventListener("click", evaluateDisplayValues);
  equalsButton.addEventListener("animationend", (event) => {
    if (event.animationName !== "shakeAnimation") return;

    equalsButton.classList.remove("shake");
  });

  buttonContainer.querySelector("#clear").addEventListener("click", () => {
    displayValues.firstNumber = "";
    displayValues.operator = null;
    displayValues.secondNumber = "";
    updateDisplay();
  });

  buttonContainer.querySelector("#backspace").addEventListener("click", () => {
    if (displayValues.secondNumber !== "") {
      displayValues.secondNumber = displayValues.secondNumber.slice(
        0,
        displayValues.secondNumber.length - 1,
      );
    } else if (displayValues.operator !== null) {
      displayValues.operator = null;
    } else if (displayValues.firstNumber !== "") {
      displayValues.firstNumber = displayValues.firstNumber.slice(
        0,
        displayValues.firstNumber.length - 1,
      );
    }

    updateDisplay();
  });
}

function simulateClick(button) {
  button.classList.add("active");
  button.click();
  setTimeout(() => {
    button.classList.remove("active");
  }, 100);
}

function evaluateDisplayValues() {
  let result = 0;
  if (displayValues.secondNumber === "") {
    document.getElementById("equals").classList.add("shake");
    return;
  }

  switch (displayValues.operator) {
    case "+":
      result = add(displayValues.firstNumber, displayValues.secondNumber);
      break;
    case "-":
      result = subtract(displayValues.firstNumber, displayValues.secondNumber);
      break;
    case "*":
      result = multiply(displayValues.firstNumber, displayValues.secondNumber);
      break;
    case "/":
      if (displayValues.secondNumber === "0") {
        document.getElementById("equals").classList.add("shake");
        return;
      }
      result = divide(displayValues.firstNumber, displayValues.secondNumber);
      break;
    default:
      result = Number(displayValues.firstNumber);
      break;
  }

  displayValues.firstNumber = result.toString();
  displayValues.operator = null;
  displayValues.secondNumber = "";
  updateDisplay();
}

function add(a, b) {
  return Number(a) + Number(b);
}

function subtract(a, b) {
  return Number(a) - Number(b);
}

function multiply(a, b) {
  return Number(a) * Number(b);
}

function divide(a, b) {
  return Number(a) / Number(b);
}

function main() {
  window.onkeydown = function (event) {
    if (event.key === "Backspace" || event.key === "/") {
      event.preventDefault(); // turn off browser transition to the previous
      // page and disable quick find shortcut
    }
  };

  addKeyBindings();
  addButtonEvents();
}

main();
