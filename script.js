'use strict'

// Getting keys (numbers and operators)
const display = document.getElementById('show-Value')
const numbers = document.querySelectorAll('[id*=button]')
const operators = document.querySelectorAll('[id*=operator]')
let historic = document.getElementById('last-calc')

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
const insertNumber = (event) => {
    updateDisplay(event.target.textContent)
    historic.innerHTML += event.target.textContent
}

numbers.forEach(number => number.addEventListener('click', insertNumber))


// Selecting an operator, cleaning the current value on display and getting an operator
const selectOperator = (event) => {
    
    if(!newNumber){
        calculate()

        newNumber = true
        historic.innerHTML += event.target.textContent 
        operator = event.target.textContent

        prevNumber = parseFloat(display.textContent.replace(',','.'))
    }
}


// Getting operators when clicking
operators.forEach(operator => operator.addEventListener('click', selectOperator))


// Using equal operator to show the result
const callEqual = () => { 
    calculate
    
    operator = undefined
    newNumber = false
    historic.innerHTML += display.textContent
}

document.getElementById('equals-operator').addEventListener('click', callEqual)


// Cleaning all the operation on display
const clearEntry = () => {
    display.textContent = '' 
    historic.textContent = ''
}    

const clearOperation = () => {
    clearEntry() // Same function to clear the display
    operator = undefined
    newNumber = true
    prevNumber = undefined
}

document.getElementById('clear').addEventListener('click', clearOperation)


// Backspace button
const removeLastNumber = () => {
    display.textContent = display.textContent.slice(0,-1)
    historic.textContent = historic.textContent.slice(0,-1)

    if(display.textContent == ''){
        historic.innerHTML = ''
    }
}
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
            historic.innerHTML += ','
        }
        else{
            updateDisplay('0,')
            historic.innerHTML += '0,'
        }
    }
}

document.getElementById('comma').addEventListener('click', insertDecimal)


// Pi button
const addPiOnDisplay = () => {
    calculate

    newNumber = false
    display.textContent = 3.14

    historic.innerHTML += 3.14
    currentNumber = 3.14
} 

document.getElementById('pi-button').addEventListener('click', addPiOnDisplay)


// Mapping keyboard clicks
const keyboardMap = {
    '0' : '0-button',
    '1' : '1-button',
    '2' : '2-button',
    '3' : '3-button',
    '4' : '4-button',
    '5' : '5-button',
    '6' : '6-button',
    '7' : '7-button',
    '8' : '8-button',
    '9' : '9-button',
    '/' : 'divide-operator',
    '*' : 'multiply-operator',
    '-' : 'minus-operator',
    '+' : 'more-operator',
    '=' : 'equals-operator',
    'c' : 'clear',
    'C' : 'clear',
    ',' : 'comma',
    'p' : 'pi-button',
    'P' : 'pi-button',
    'Enter' : 'equals-operator',
    'Backspace' : 'backspace'
}

const mappingKeyboard = (event) => {
    
    const key = event.key
    const allowedKey = () => Object.keys(keyboardMap).indexOf(key) !== -1
    
    if(allowedKey()){

        document.getElementById(keyboardMap[key]).click() 
        // if(key !== 'Enter' && key !== 'Backspace' && key !== 'c' && key !== 'C' && key !== 'p' && key !== 'P' && key !== '='){
        //     historic.innerHTML += key
        // }    
    } 
}

document.addEventListener('keydown', mappingKeyboard)