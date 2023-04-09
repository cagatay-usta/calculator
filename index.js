const buttons = document.querySelectorAll(".btn");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");

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
        if (!checkValidInput(button.textContent)) return;
        screenUpper.textContent += ` ${button.textContent} `;
    } else {
      screenUpper.textContent += button.textContent;
    }
}

function checkValidInput(input) {
    let screenText = screenUpper.textContent;
    screenText = screenText.replace(/\s+/g, ''); // regex to clear whitespaces
    screenText = screenText.charAt(screenText.length - 1); 
    if (
        screenText === "+" ||
        screenText === "-" ||
        screenText === "/" ||
        screenText === "*" 
    ) {
        return false;
    } else return true;
}

function sanitizeKey(key) {
        // last char of e.code leaves the Numpad or Digit part 
        let keyDown = key.charAt(key.length - 1)
        // but also gets the last char of operator eg:Divide -> e; switch-case handles this
        switch (keyDown) {
            case 'e':
                return 'Divide';
            case 'y':
                return 'Multiply';
            case 'd':
                return 'Add';
            case 't':
                return 'Subtract';
            case 'r':
                return 'Enter';
            case 'l':
                return 'dot';
        }
        return keyDown;
}

buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        displayButton(e.target);
    });
});

window.addEventListener('keydown', function(e) {
    let keyDown = e.code;
    keyDown = sanitizeKey(keyDown);

    const button = this.document.getElementById(keyDown);
    displayButton(button);
})  
