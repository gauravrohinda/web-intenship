let currentInput = '';
let operator = '';
let previousInput = '';
let shouldResetDisplay = false;

const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
const equalsButton = document.getElementById('equals');
const clearButton = document.getElementById('clear');

// Add event listeners to each button
buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        const value = e.target.getAttribute('data-value');
        if (shouldResetDisplay && !['+', '-', '*', '/'].includes(value)) {
            currentInput = '';
            shouldResetDisplay = false;
        }
        handleButtonClick(value);
    });
});

equalsButton.addEventListener('click', calculate);
clearButton.addEventListener('click', clearAll);

function handleButtonClick(value) {
    if (value === '+' || value === '-' || value === '*' || value === '/') {
        if (currentInput === '' && previousInput !== '') {
            operator = value;
            updateDisplay(previousInput + ' ' + operator);
            return;
        }
        if (previousInput && currentInput && operator) {
            calculate();
        }
        operator = value;
        previousInput = currentInput;
        currentInput = '';
        updateDisplay(previousInput + ' ' + operator);
    } else {
        currentInput += value;
        updateDisplay(previousInput + ' ' + operator + ' ' + currentInput);
    }
}

function calculate() {
    if (!previousInput || !currentInput || !operator) return;

    let result = 0;
    const prev = parseFloat(previousInput);
    const curr = parseFloat(currentInput);

    switch (operator) {
        case '+':
            result = prev + curr;
            break;
        case '-':
            result = prev - curr;
            break;
        case '*':
            result = prev * curr;
            break;
        case '/':
            result = prev / curr;
            break;
        default:
            return;
    }

    currentInput = result.toString();
    operator = '';
    previousInput = '';
    shouldResetDisplay = true;
    updateDisplay(currentInput);
}

function clearAll() {
    currentInput = '';
    previousInput = '';
    operator = '';
    updateDisplay('');
}

function updateDisplay(value) {
    display.value = value.trim();
}
