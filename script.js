'use strict'

// Getting keys (numbers and operators)
const display = document.getElementById('show-Value')
const numbers = document.querySelectorAll('[id*=button]')
const operators = document.querySelectorAll('[id*=operator]')


// variables to make the control of new values and operators on display
let newNumber = true
let operator = ''
let prevNumber = ''


// Checking pending operations and calculating numbers
const pendingOperation = () => operator !== undefined

const calculate = () => {
    
    if(pendingOperation()){
        const currentNumber = parseFloat(display.textContent)
        newNumber = true

        if(operator == '+'){
            console.log(prevNumber)
            console.log(currentNumber)
            updateDisplay(prevNumber + currentNumber)
        }
    }
}


// Show each number selected and cleaning the initial value (the cursor)
const updateDisplay = (text) => {
    
    if(newNumber){
        display.textContent = text
        newNumber = false
    }
    else{
        display.textContent += text
    }
}


// Getting numbers when clicking
const insertNumber = (event) => updateDisplay(event.target.textContent)
numbers.forEach(number => number.addEventListener('click', insertNumber))


// Selecting an operator, cleaning the current value on display and getting an operator
const selectOperator = (event) => {
    
    if(!newNumber){
        calculate()
        newNumber = true
        operator = event.target.textContent
        prevNumber = parseFloat(display.textContent)
        console.log(operator)
    }
}


// Getting operators when clicking
operators.forEach(operator => operator.addEventListener('click', selectOperator))


// - Fazer o cursor ficar piscando? (com css video:30min)