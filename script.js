'use strict'

// Getting keys (numbers and operators)
const display = document.getElementById('show-Value')
const numbers = document.querySelectorAll('[id*=button]')
const operators = document.querySelectorAll('[id*=operator]')


// variables to make the control of new values and operators on display
let newNumber = true
let operator  
let prevNumber


// Checking pending operations and calculating numbers
const pendingOperation = () => operator !== undefined

const calculate = () => {
    
    if(pendingOperation()){
        const currentNumber = parseFloat(display.textContent)
        newNumber = true

        const result = eval(`${prevNumber}${operator}${currentNumber}`)
        updateDisplay(result)
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


// Using equal operator to show the result
const callEqual = () => {
    calculate
    operator = undefined
}

document.getElementById('equals-operator').addEventListener('click', callEqual)


// Cleaning operation on display
const clearOperation = () => display.textContent = ''
document.getElementById('cancel-entry').addEventListener('click', clearOperation)



// - Fazer o cursor ficar piscando? (com css video:30min)