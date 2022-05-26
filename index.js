//LCD Values
const valuesToCalculate = document.querySelector('.calculations');
const answer = document.querySelector('.answer');
const numbers = document.querySelectorAll('.number');
const operations = document.querySelectorAll('.math');
//FUNCTIONS envoke
const equalSign = document.querySelector('.equal');
const clearSign = document.querySelector('.clear');
const clearRecentVal = document.querySelector('.clear-most-recent');

// Make a squaroot to be part of a number and test if a number contains a square root and do Math.square root and assign it to value1 or value2.
//let bracket be part of the number string and test if the equation has bracket and do a BODMAS rule to solve the calculation.
class Calculator {
    constructor(valuesToCalculate, answer) {
        this.values = valuesToCalculate;
        this.answer = answer;
        this.clear();
    }
    clear() {
        this.firstValue = " ";
        this.secondValue = " ";
        this.tempStore = "";
        this.answerVal = '0';
        this.forDisplay = [];
        this.aswerHistory = [];
        this.operation = undefined;
    };
    delete() {
        this.forDisplay.pop();
        if (this.aswerHistory.length !== 0) {
            this.aswerHistory.pop();
            this.answerVal = this.aswerHistory[this.aswerHistory.length - 1];
            console.log(this.answerVal);
        }
        if (this.forDisplay.length <= 3 || this.aswerHistory.length === 0 || this.answerVal === undefined) this.answerVal = 0;
        if (this.forDisplay.length === 0) this.clear();
    }

    calculate(number) {
        if (number === "." && this.secondValue.includes('.')) return;
        this.tempStore = this.tempStore.toString() + number.toString();
        this.forDisplay.push(this.tempStore);
        this.tempStore = "";
        this.secondValue = this.secondValue.toString() + number.toString();
        if (this.secondValue.includes("%")) {
            const num = this.secondValue.slice(0, -1);
            this.secondValue = num / 100;
        }


    };
    selectedOperation(operation) {
            if (this.secondValue.length > 2 && this.secondValue.includes("√")) {
                const sRoot = this.secondValue.replace("√", "");
                this.secondValue = Math.sqrt(sRoot);
                console.log(this.secondValue);
            }
            if (operation === " ") return;
            this.operation = operation;
            if (this.forDisplay[this.forDisplay.length - 1] === this.operation) return;
            if (this.answerVal !== "0") {
                this.firstValue = this.answerVal;
                this.secondValue = " ";
            }
            this.tempOperation = operation;
            this.forDisplay.push(this.tempOperation);
            this.tempOperation = "";
            if (this.answerVal === "0") {
                this.firstValue = this.secondValue;
                this.secondValue = " ";
            }
        }
        //behind the scenes calculations
    doCalculations() {
        if (this.secondValue.length > 2 && this.secondValue.includes("√")) {
            const sRoot = this.secondValue.replace("√", "");
            this.secondValue = Math.sqrt(sRoot);
            console.log(this.secondValue);
        }
        let result;
        const value1 = parseFloat(this.firstValue);
        const value2 = parseFloat(this.secondValue);
        if (isNaN(value1) && isNaN(value2)) return;
        switch (this.operation) {
            case "+":
                result = value1 + value2;
                break;
            case "-":
                result = value1 - value2;
                break;
            case "x":
                result = value1 * value2;
                break;
            case "÷":
                result = value1 / value2;
                break;
            case "√":
                result = Math.sqrt(value1);
                break;
            default:
                return;
        }
        this.answerVal = result;
        this.aswerHistory.push(this.answerVal);
        this.operation = undefined;
        this.firstValue = " ";
    }
    lcdDisplay() {
        this.values.innerText = this.forDisplay.join('');
    }
    answerDisplay() {
        this.answer.innerText = this.answerVal;
    }
}








window.onload = () => {
    answer.innerText = 0;
};
const calculator = new Calculator(valuesToCalculate, answer);
numbers.forEach(button => {
    button.addEventListener('click', () => {
        calculator.calculate(button.innerText);
        calculator.lcdDisplay();
    });
});
operations.forEach(operations => {
    operations.addEventListener('click', () => {
        calculator.selectedOperation(operations.innerText);
        calculator.lcdDisplay();
    });
});
clearSign.addEventListener('click', () => {
    calculator.clear();
    calculator.lcdDisplay();
    calculator.answerDisplay();
});
equalSign.addEventListener('click', () => {
    calculator.doCalculations();
    calculator.answerDisplay();
});
clearRecentVal.addEventListener('click', () => {
    calculator.delete();
    calculator.lcdDisplay();
    calculator.answerDisplay();
});