document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    let currentInput = '';
    let operator = '';
    let previousInput = '';

    const updateDisplay = () => {
        display.textContent = currentInput || '0';
    };

    const handleNumber = (number) => {
        if (currentInput.length < 16) { // Limiting length for display purposes
            currentInput += number;
            updateDisplay();
        }
    };

    const handleOperator = (op) => {
        if (currentInput === '' && op !== '-') return; // Allow '-' at the start
        if (currentInput !== '') {
            if (previousInput !== '') {
                calculate();
            }
            operator = op;
            previousInput = currentInput;
            currentInput = '';
        }
    };

    const calculate = () => {
        let result;
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);

        if (isNaN(prev) || isNaN(current)) return;

        switch (operator) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                if (current === 0) {
                    result = 'Error'; // Handle division by zero
                } else {
                    result = prev / current;
                }
                break;
            default:
                return;
        }

        currentInput = result.toString();
        operator = '';
        previousInput = '';
        updateDisplay();
    };

    const handleDecimal = () => {
        if (!currentInput.includes('.')) {
            currentInput += '.';
            updateDisplay();
        }
    };

    const handleClear = () => {
        currentInput = '';
        previousInput = '';
        operator = '';
        updateDisplay();
    };

    // Event listeners for buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const buttonText = e.target.textContent;
            if (!isNaN(buttonText)) {
                handleNumber(buttonText);
            } else if (buttonText === '.' || buttonText === 'C') {
                if (buttonText === '.') {
                    handleDecimal();
                } else {
                    handleClear();
                }
            } else if (['+', '-', '*', '/'].includes(buttonText)) {
                handleOperator(buttonText);
            } else if (buttonText === '=') {
                calculate();
            }
        });
    });
});
