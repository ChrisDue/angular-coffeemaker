/// <reference types="cypress" />

context('Ingredients - UI Tests', () => {
  beforeEach(() => {
    cy.resetIngredientsTable();
    cy.visit(Cypress.env('appUrl_Ingredients'));
  })

  /* General tests */
  it.only('All ingredients show their current amount', () => {
    cy.get('#form-Coffee').find('label').contains('Coffee: 10g');
    cy.get('#form-Water').find('label').should('contain.text', 'Water: 10');
    cy.get('#form-Milk').get('label').should('contain.text', 'Milk: 10');
    cy.get('#form-Cocoa').should('contain.text', 'Cocoa: 10');
  })

  it('All ingredients show their correct unit', () => {
    cy.get('#form-Coffee').find('label').contains('g');
    cy.get('#form-Water').find('label').contains('ml');
    cy.get('#form-Milk').find('label').contains('ml');
    cy.get('#form-Cocoa').find('label').contains('g');
  })

  /* User interactions take effect */
  it('Ingredient amounts are updated after changes', () => {
    cy.get('#amount-Water').type(1);
    cy.get('#button-Water').should('be.enabled').click();
    cy.get('#form-Water').find('label').contains('Water: 11ml');
  })

  it('Submit button disabled before interaction', () => {
    cy.get('#amount-Coffee').click();
    cy.get('#button-Coffee').should('be.disabled');
  })

  it('Submit button disabled by empty input', () => {
    cy.get('#amount-Coffee').click();
    cy.get('#ingredient-Coffee').find('label').click();
    cy.get('#button-Coffee').should('be.disabled');
  })

  it('Submit button enabled after typing value', () => {
    cy.get('#amount-Water').type(1);
    cy.get('#button-Water').should('be.enabled');
  })

  /* Alerts behave correctly */
  it('No alerts displayed before interaction', () => {
    cy.get('.alert').should('not.exist');
  })

  it('Empty amount triggers alert', () => {
    cy.get('#amount-Coffee').click();
    cy.get('#ingredient-Coffee').find('label').click();
    cy.get('.alert').should('be.visible');
  })

  it('Empty amount alert text correct', () => {
    cy.get('#amount-Coffee').click();
    cy.get('#ingredient-Coffee').find('label').click();
    cy.get('.alert').should('be.visible');
  })

  it('Empty amount alert disappears after inserting one', () => {
    cy.get('#amount-Milk').type(1);
    cy.get('#button-Milk').should('be.enabled').click();
    cy.get('.alert').should('not.exist');
  })

  /* Page length doesn't cause issues */
  it('Bottommost ingredient can be reached', () => {
    cy.scrollTo('bottom');
    cy.get('#ingredient-Cocoa').should('be.visible');
  })

  it('Bottommost ingredient not scrolled out of view after interaction', () => {
    cy.get('#amount-Cocoa').scrollIntoView();
    //cy.wait(500);
    cy.get('#amount-Cocoa')
      .should('be.visible')
      .type(1);
    cy.get('#button-Cocoa').should('be.enabled')
      .click();
    cy.get('#ingredient-Cocoa').should('be.visible');
    cy.get('#form-Cocoa').find('label').contains('Cocoa: 11g');
  })
})
