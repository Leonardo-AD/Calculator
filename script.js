'use strict'

const display = document.getElementById('show-Value')
const numbers = document.querySelectorAll('[id*=button]')

const insertNumber = (event) => display.textContent = event.target.textContent

numbers.forEach(number => number.addEventListener('click', insertNumber))
console.log(number)
// - Fazer o cursor ficar piscando? (com css)

