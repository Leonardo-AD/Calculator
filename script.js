'use strict'

// Getting keys (numbers and operators)
const display = document.getElementById('show-Value')
const numbers = document.querySelectorAll('[id*=button]')
const operators = document.querySelectorAll('[id*=operator]')


// let to make the control of new values on display
let newNumber = true


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


// Selecting an operator and cleaning the current value on display
const selectOperator = () => {
    newNumber = true
}


// Getting operators when clicking
operators.forEach(operator => operator.addEventListener('click', selectOperator))


// - Fazer o cursor ficar piscando? (com css video:20min)