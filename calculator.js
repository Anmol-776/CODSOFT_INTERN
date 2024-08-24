document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    let currentInput = '';
    let operator = '';
    let operand1 = '';
    let operand2 = '';
    let result = '';

    const updateDisplay = (value) => {
        display.textContent = value;
    };

    const clearCalculator = () => {
        currentInput = '';
        operator = '';
        operand1 = '';
        operand2 = '';
        result = '';
        updateDisplay('0');
    };

    const handleNumber = (num) => {
        currentInput += num;
        updateDisplay(currentInput);
    };

    const handleOperator = (op) => {
        if (currentInput !== '') {
            operand1 = currentInput;
            operator = op;
            currentInput = '';
        }
    };

    const calculate = () => {
        if (operand1 !== '' && currentInput !== '' && operator !== '') {
            operand2 = currentInput;
            switch (operator) {
                case '+':
                    result = parseFloat(operand1) + parseFloat(operand2);
                    break;
                case '-':
                    result = parseFloat(operand1) - parseFloat(operand2);
                    break;
                case '*':
                    result = parseFloat(operand1) * parseFloat(operand2);
                    break;
                case '/':
                    result = parseFloat(operand1) / parseFloat(operand2);
                    break;
            }
            updateDisplay(result);
            currentInput = result;
            operator = '';
        }
    };

    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const value = e.target.id;
            if (value >= '0' && value <= '9' || value === '.') {
                handleNumber(value);
            } else if (value === 'C') {
                clearCalculator();
            } else if (value === '=') {
                calculate();
            } else {
                handleOperator(value);
            }
        });
    });
});
