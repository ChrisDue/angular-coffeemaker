/// <reference types="cypress" />

context('Ingredients - UI Tests', () => {
  beforeEach(() => {
    cy.resetIngredientsTable();
    cy.visit('http://localhost:4200/ingredients');
  })

  after(() => {
    cy.resetIngredientsTable();
  })

  /* General tests */
  it('All ingredients show their current amount', () => {
    cy.get('#form-Coffee').find('label').should('contain.text', 'Coffee: 10');
    cy.get('#form-Water').find('label').should('contain.text', 'Water: 10');
    cy.get('#form-Milk').find('label').should('contain.text', 'Milk: 10');
    cy.get('#form-Cocoa').find('label').should('contain.text', 'Cocoa: 10');
    cy.get('#form-Sugar').find('label').should('contain.text', 'Sugar: 10');
  })

  it('All ingredients show their correct unit', () => {
    cy.get('#form-Coffee').find('label').should('contain.text', 'g');
    cy.get('#form-Water').find('label').should('contain.text', 'ml');
    cy.get('#form-Milk').find('label').should('contain.text', 'ml');
    cy.get('#form-Cocoa').find('label').should('contain.text', 'g');
    cy.get('#form-Sugar').find('label').should('contain.text', 'g');
  })

  /* User interactions take effect */
  it('Ingredient amounts are updated after changes', () => {
    cy.get('#amount-Water').type(1);
    cy.get('#button-Water').should('be.enabled').click();
    cy.get('#form-Water').find('label').contains('Water: 11ml');
  })

  it('Submit button disabled before interaction', () => {
    cy.get('#button-Coffee').should('be.disabled');
  })

  it('Submit button disabled during interaction', () => {
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

  /* Page length doesn't cause issues */
  it('Bottommost ingredient can be reached', () => {
    cy.scrollTo('bottom');
    cy.get('#ingredient-Cocoa').should('be.visible');
  })

  it.only('Bottommost ingredient not scrolled out of view after interaction', () => {
    cy.get('#amount-Cocoa').scrollIntoView();
    cy.get('#amount-Cocoa').should('be.visible')
      .type(1);
    cy.get('#button-Cocoa').should('be.enabled')
      .click();
    cy.get('#ingredient-Cocoa').should('be.visible');
    cy.get('#form-Cocoa').find('label')
      .should('contain.text', 'Cocoa: 11g')
      .and('be.visible');
  })
})
