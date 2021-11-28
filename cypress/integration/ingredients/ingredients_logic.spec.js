/// <reference types="cypress" />

context('Ingredients - Logic Tests', () => {
  beforeEach(() => {
    cy.resetIngredientsTable();
    cy.visit('http://localhost:4200/ingredients');
  })

  after(() => {
    cy.resetIngredientsTable();
  })

  /* Alerts behave correctly */
  it('No alerts displayed before interaction', () => {
    cy.get('.alert').should('not.exist');
  })

  it('Empty amount triggers alert with correct text', () => {
    cy.get('#amount-Coffee').click();
    cy.get('#ingredient-Coffee').find('label').click();
    cy.get('.alert').should('be.visible')
      .and('contain.text', 'An amount is required 🤲');
  })

  it('Empty amount alert disappears after inserting one', () => {
    cy.get('#amount-Milk').type(1);
    cy.get('#button-Milk').should('be.enabled').click();
    cy.get('.alert').should('not.exist');
  })
})
