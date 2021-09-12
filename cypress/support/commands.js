/* Default values for ingredients */
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
const default_sugar = {
  "id": 5,
  "name": "Sugar",
  "unit": "g",
  "amount": 10
}

/* Default recipes */
const default_americano = {
  "name": "Americano",
  "coffeeAmount": 5,
  "waterAmount": 10,
  "milkAmount": 0,
  "cocoaAmount": 0,
  "sugarAmount": 0,
  "id": 1
}
const default_espresso = {
  "name": "Espresso",
  "coffeeAmount": 10,
  "waterAmount": 10,
  "milkAmount": 0,
  "cocoaAmount": 0,
  "sugarAmount": 0,
  "id": 2
}
const default_latteMacchiato = {
  "name": "Latte Macchiato",
  "coffeeAmount": 5,
  "waterAmount": 10,
  "milkAmount": 5,
  "cocoaAmount": 0,
  "sugarAmount": 5,
  "id": 3
}
const default_hotChocolate = {
  "name": "Hot Chocolate",
  "coffeeAmount": 0,
  "waterAmount": 0,
  "milkAmount": 10,
  "cocoaAmount": 10,
  "sugarAmount": 10,
  "id": 4
}

/* Commands to reset database tables */
// Using simple variable, for thesis
Cypress.Commands.add('resetIngredientsTable', () => {
  let ingredientsUrl = "http://localhost:3000/ingredients";
  cy.request('PUT', ingredientsUrl + '/1', default_coffee);
  cy.request('PUT', ingredientsUrl + '/2', default_water);
  cy.request('PUT', ingredientsUrl + '/3', default_milk);
  cy.request('PUT', ingredientsUrl + '/4', default_cocoa);
  cy.request('PUT', ingredientsUrl + '/5', default_sugar);
});

// Using global constant and id reference, for style 
Cypress.Commands.add('resetIngredientsTable_nice', () => {
  cy.request('PUT', Cypress.env('dbUrl_Ingredients') + default_coffee.id, default_coffee);
  cy.request('PUT', Cypress.env('dbUrl_Ingredients') + default_water.id, default_water);
  cy.request('PUT', Cypress.env('dbUrl_Ingredients') + default_milk.id, default_milk);
  cy.request('PUT', Cypress.env('dbUrl_Ingredients') + default_cocoa.id, default_cocoa);
  cy.request('PUT', Cypress.env('dbUrl_Ingredients') + default_sugar.id, default_sugar);
});

Cypress.Commands.add('resetRecipesTable', () => {
  /* Fixtures not working for coffeemaker yet */
  // cy.fixture("db_backup.json").then((db_backup) => {
  //   cy.writeFile('db.json', db_backup);
  // })

  let i = 5;
  while (i < 7) { // 4 are default and tests never add more than 2 (so far)
    cy.request({
      method: 'DELETE',
      failOnStatusCode: false,
      url: Cypress.env('dbUrl_Recipes') + '/' + i // delete newly added recipes
    });
    i++;
  };
  cy.request('PUT', Cypress.env('dbUrl_Recipes') + '/1', default_americano);
  cy.request('PUT', Cypress.env('dbUrl_Recipes') + '/2', default_espresso);
  cy.request('PUT', Cypress.env('dbUrl_Recipes') + '/3', default_latteMacchiato);
  cy.request('PUT', Cypress.env('dbUrl_Recipes') + '/4', default_hotChocolate);
});
