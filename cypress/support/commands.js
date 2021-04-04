// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

const default_coffee = {
    "id": 1,
    "name": "Coffee",
    "unit": "g",
    "amount": 10
}
const default_water = {
    "id": 2,
    "name": "Water",
    "unit": "ml",
    "amount": 10
}
const default_milk = {
    "id": 3,
    "name": "Milk",
    "unit": "ml",
    "amount": 10
}
const default_cocoa = {
    "id": 4,
    "name": "Cocoa",
    "unit": "g",
    "amount": 10
}

const default_americano = {
    "name": "Americano",
    "coffeeAmount": 5,
    "waterAmount": 10,
    "milkAmount": 0,
    "cocoaAmount": 0,
    "isFavorite": false,
    "id": 1
}
const default_espresso = {
    "name": "Espresso",
    "coffeeAmount": 10,
    "waterAmount": 10,
    "milkAmount": 0,
    "cocoaAmount": 0,
    "isFavorite": false,
    "id": 2
}
const default_latteMacchiato = {
    "name": "Latte Macchiato",
    "coffeeAmount": 5,
    "waterAmount": 10,
    "milkAmount": 5,
    "cocoaAmount": 0,
    "isFavorite": false,
    "id": 3
}
const default_hotChocolate = {
    "name": "Hot Chocolate",
    "coffeeAmount": 0,
    "waterAmount": 0,
    "milkAmount": 10,
    "cocoaAmount": 10,
    "isFavorite": false,
    "id": 4
}

Cypress.Commands.add('resetIngredientsTable', () => {
    cy.request('PUT', Cypress.env('dbUrl_Ingredients') + '/1', default_coffee);
    cy.request('PUT', Cypress.env('dbUrl_Ingredients') + '/2', default_water);
    cy.request('PUT', Cypress.env('dbUrl_Ingredients') + '/3', default_milk);
    cy.request('PUT', Cypress.env('dbUrl_Ingredients') + '/4', default_cocoa);
});

Cypress.Commands.add('resetRecipeTable', () => {
    cy.request('PUT', Cypress.env('dbUrl_Recipes') + '/1', default_americano);
    cy.request('PUT', Cypress.env('dbUrl_Recipes') + '/2', default_espresso);
    cy.request('PUT', Cypress.env('dbUrl_Recipes') + '/3', default_latteMacchiato);
    cy.request('PUT', Cypress.env('dbUrl_Recipes') + '/4', default_hotChocolate);
});
