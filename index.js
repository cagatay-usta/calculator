/* eslint-disable no-restricted-globals */
/* eslint-disable no-use-before-define */
/* eslint-disable consistent-return */
/* eslint-disable default-case */
/* eslint-disable no-undef */
const buttons = document.querySelectorAll(".btn");

const screenUpper = document.querySelector("#upper");
const screenLower = document.querySelector("#lower");


function add(a, b) {
  return +a + +b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
    if (a === 0 && b === 0) return 'LEBLEBI';
    return a / b;
}

function calculate(a, operator, b) {
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      return divide(a, b);
  }
}

function getOperands(text) {
    const operands = text.textContent.split(' ');
    
    // makes sure that split wont result in ['2', '+', ''] 
    if (operands[operands.length - 1] === '') {
        operands.pop();
    }
    return operands;
}

function displayButton(button) {
    
    if (button.textContent === '=') {
        checkResult();
        return;
    }
    if (button.textContent === "CLEAR") {
        screenUpper.textContent = "";
        screenLower.textContent = "";
        return;
    }
    if (button.textContent === "DELETE") {
        const text = screenUpper.innerText.slice(0,-1);
        screenUpper.textContent = `${text}`;
        return;
    }
    if (
      button.textContent === "+" ||
      button.textContent === "-" ||
      button.textContent === "/" ||
      button.textContent === "*"
    ) {
        // checks if operator used twice to prevent "2++2"
        if (checkValidInput(button.textContent) === false) {
            checkResult();
            return;
        }

        // if there are two numbers and an operator already, displays the results immediately, then displays the operator after it
        const operandNumber = getOperands(screenUpper);
        if (operandNumber.length === 3) {
            checkResult();
        }

        screenUpper.textContent += ` ${button.textContent} `;
    } else {
      screenUpper.textContent += button.textContent;
    }
}

function checkResult() {
    const operands = getOperands(screenUpper);
    // check if there are two numbers and an operator, return if not    
    if (operands.length < 3) return;

    let result = calculate(operands[0], operands[1], operands[2]);
    if (!isFinite(result)) {
        screenUpper.textContent = "LEBLEBI";
        screenLower.textContent = "LEBLEBI";
    } else {
        result = Math.round(result * 100) / 100 // rounds down to 2 decimal points
        screenUpper.textContent = result;
        screenLower.textContent = result;
    }
}

function checkValidInput() {
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
    } return true;
}

function sanitizeKey(key) {
        // last char of e.code leaves the Numpad or Digit part 
        const keyDown = key.charAt(key.length - 1)
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
    button.addEventListener('click', (e) => {
        displayButton(e.target);

    });
});

window.addEventListener('keydown', (e) => {
    e.preventDefault();
    let keyDown = e.code;
    keyDown = sanitizeKey(keyDown);
    const button = this.document.getElementById(keyDown);
    displayButton(button);
})  
