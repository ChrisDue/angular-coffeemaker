/// <reference types="cypress" />

context('Ingredients - DB Tests', () => {
  beforeEach(() => {
    cy.resetIngredientsTable();
    cy.visit('http://localhost:4200/ingredients');
  })

  after(() => {
    cy.resetIngredientsTable();
  })

  /* General tests */

  /* User interactions take effect */
  it('Ingredient amounts are updated after changes', () => {
    cy.get('#amount-Water').type(1);
    cy.get('#button-Water').should('be.enabled').click();
    cy.get('#form-Water').find('label').contains('Water: 11ml');
  })
})
