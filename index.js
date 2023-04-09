const buttons = document.querySelectorAll(".btn");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const clearButton = document.querySelector("#clear");
const deleteButton = document.querySelector("#delete");

const screenUpper = document.querySelector("#upper");
const screenLower = document.querySelector("#lower");
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function calculate(a, operator, b) {
  switch (operator) {
    case "add":
      return add(a, b);
    case "subtract":
      return subtract(a, b);
    case "multiply":
      return multiply(a, b);
    case "divide":
      return divide(a, b);
  }
}

function displayButton(button) {
    if (button.textContent === '=') {
        screenLower.textContent = "";
        return;
    }
    if (button.textContent === "CLEAR") {
        screenUpper.textContent = "";
        screenLower.textContent = "";
        return;
    }
    if (button.textContent === "DELETE") {
        let text = screenUpper.innerText.slice(0,-1);
        screenUpper.textContent = `${text}`;
        return;
    }
    if (
      button.textContent === "+" ||
      button.textContent === "-" ||
      button.textContent === "/" ||
      button.textContent === "*"
    ) {
      screenUpper.textContent += ` ${button.textContent} `;
    } else {
      screenUpper.textContent += button.textContent;
    }
  
}

buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        displayButton(e.target);
    });
});
