/// <reference types="cypress" />

context('Ingredients - UI Tests', () => {
  beforeEach(() => {
    cy.resetRecipesTable();
    cy.visit(Cypress.env('appUrl_Recipes'));
  })

  /* General display tests */
  it('Requirements warning shown by default', () => {
    cy.get('#requirements-warning').should('be.visible');
  })

  it('Submit Button disabled by default', () => {
    cy.get('#submit-new-recipe').should('be.disabled');
  })

  it('All ingredients show their correct unit', () => {
    cy.get('#coffeeAmount > label').should('contain','in g');
  })

  /* User interactions */
  it('Recipe name can be typed', () => {
    cy.get('#name').type('Short Coffee Name');
  })

  it('All ingredient amounts can be typed', () => {
    cy.get('#coffeeAmount').type('1');
    cy.get('#waterAmount').type('2');
    cy.get('#milkAmount').type('3');
    cy.get('#cocoaAmount').type('4');
  })

  it('Submit button enabled after typing name and 1 value', () => {
    cy.get('#name').type('Enabling Coffee');
    cy.get('#coffeeAmount').type(5);
    cy.get('#submit-new-recipe').should('be.enabled');
  })

  it('Submit Button disabled when ingredient amounts are 0', () => {
    cy.get('#name').type('Disabled Empty Coffee');
    cy.get('#coffeeAmount').type('0');
    cy.get('#waterAmount').type('0');
    cy.get('#milkAmount').type('0');
    cy.get('#cocoaAmount').type('0');
    cy.get('#submit-new-recipe').should('be.disabled');
  })

  /* Input sanitization */
  it('Error shown if name less than 2 chars', () => {
    cy.get('#name').type('A');
    // click somewhere else to trigger error visibility
    cy.get('#form-new-recipe').click();
    cy.get('#error-name-length').should('be.visible');
  })

  it('Error shown if name clicked but left empty', () => {
    cy.get('#name').click();
    // click somewhere else to trigger error visibility
    cy.get('#form-new-recipe').click();
    cy.get('#error-name-empty').should('be.visible');
  })

  it('Recipe name is cut at 20 chars', () => {
    cy.get('#name')
      .type('Best Coffee for Testers')
      .get('[ng-reflect-model]')
      .should('have.value', 'Best Coffee for Test');
  })

  it('Ingredient amounts are capped at 1500', () => {
    cy.get('#coffeeAmount')
      .type('1501')
      .get('[ng-reflect-model]')
      .should('have.value', '1500');
  })

  // TODO from here on down -->
  it.only('Ingredient amounts are saved correctly in newly created recipe', () => {
    cy.get('#name').type('Test Recipe');
    cy.get('#waterAmount').type(1);
    cy.get('#submit-new-recipe').should('be.enabled').click();
    // cy.get('#recipe-Test Recipe').find('label').should('contain.text', 'Water: 11ml');
    cy.get('#recipe-Test Recipe').should('contain.text', 'Needed Water: 1ml');
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
    cy.wait(500);
    cy.get('#amount-Cocoa').should('be.visible')
      .type(1);
    cy.get('#button-Cocoa').should('be.enabled')
      .click();
    cy.get('#ingredient-Cocoa').should('be.visible');
    cy.get('#form-Cocoa').find('label').should('contain.text', 'Cocoa: 11g');
  })
})
