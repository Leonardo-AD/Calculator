'use strict'

// Getting keys (numbers and operators)
const display = document.getElementById('show-Value')
const numbers = document.querySelectorAll('[id*=button]')
const operators = document.querySelectorAll('[id*=operator]')


// variables to make the control of new values and operators on display
let newNumber = true
let operator
let prevNumber
let currentNumber


// Checking pending operations and calculating numbers
const pendingOperation = () => operator !== undefined

const calculate = () => {
    
    if(pendingOperation()){
        const currentNumber = parseFloat(display.textContent.replace(',','.'))
        newNumber = true

        const result = eval(`${prevNumber}${operator}${currentNumber}`)
        updateDisplay(result)
    }
}


// Show each number selected and cleaning the initial value (the cursor)
const updateDisplay = (text) => {
    
    if(newNumber){
        display.textContent = text.toLocaleString('BR')
        newNumber = false
    }
    else{
        display.textContent += text.toLocaleString('BR')
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
        prevNumber = parseFloat(display.textContent.replace(',','.'))
    }
}


// Getting operators when clicking
operators.forEach(operator => operator.addEventListener('click', selectOperator))


// Using equal operator to show the result
const callEqual = () => {
    calculate //``` BUG HERE: i cannot continue the operation after click the iqual button ```
    operator = undefined
}

document.getElementById('equals-operator').addEventListener('click', callEqual)


// Cleaning all the operation on display
const clearEntry = () => display.textContent = ''

const clearOperation = () => {
    clearEntry() // Same function to clear the display
    operator = undefined
    newNumber = true
    prevNumber = undefined
}

document.getElementById('clear').addEventListener('click', clearOperation)


// Backspace button
const removeLastNumber = () => display.textContent = display.textContent.slice(0,-1)
document.getElementById('backspace').addEventListener('click',removeLastNumber)


// Change operation sign
const changeSign = () => {
    newNumber = true
    updateDisplay(display.textContent * -1)
}

document.getElementById('more-minus-button').addEventListener('click', changeSign)


// Inserting decimal values
const existDecimal = () => display.textContent.indexOf(',') !== -1
const existValue = () => display.textContent.length > 0

const insertDecimal = () => {
    
    if(!existDecimal()){
        if(existValue()){
            updateDisplay(',')
        }
        else{
            updateDisplay('0,')
        }
    }
}

document.getElementById('comma').addEventListener('click', insertDecimal)



// (video:59min)