/// <reference types="cypress" />

context('Ingredients - DB Tests', () => {
  beforeEach(() => {
    cy.resetIngredientsTable();
    cy.visit('http://localhost:4200/ingredients');
  })

  after(() => {
    cy.resetIngredientsTable();
  })

  /* Default values - Test via request */
  it('Default amount is pre-set correctly in DB', () => {
    cy.request('GET', Cypress.env('dbUrl_Ingredients') + '/1').then(response => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('name', 'Coffee');
      expect(response.body).to.have.property('amount', 10);
    });
  })

  /* Change via UI - Test via request */
  it('Ingredient amount is updated after UI interaction', () => {
    cy.get('#amount-Water').type(1);
    cy.get('#button-Water').should('be.enabled').click();
    cy.request('GET', Cypress.env('dbUrl_Ingredients') + '/2').then(response => {
      expect(response.body).to.have.property('name', 'Water');
      expect(response.body).to.have.property('amount', 11);
    });
  })

  /* Change via request - Test via request */
  it('Ingredient amount is updated after PUT request', () => {
    cy.request('PUT', Cypress.env('dbUrl_Ingredients') + '/3', empty_milk);
    cy.request('GET', Cypress.env('dbUrl_Ingredients') + '/3').then(response => {
      expect(response.body).to.have.property('name', 'Milk');
      expect(response.body).to.have.property('amount', 0);
    });
  })

  const empty_milk = {
    "id": 3,
    "name": "Milk",
    "unit": "ml",
    "amount": 0
  }
})
