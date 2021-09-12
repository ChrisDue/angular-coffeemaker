/// <reference types="cypress" />

context('Recipes - UI Tests', () => {
  beforeEach(() => {
    cy.resetRecipesTable();
    cy.resetIngredientsTable();
    cy.visit(Cypress.env('appUrl_Recipes'));
  })

  after(() => {
    cy.resetRecipesTable();
    cy.resetIngredientsTable();
  })

  /* Brewing recipes */
  it('Brewing original recipe uses ingredients correctly', () => {
    cy.get('#recipe-Americano > #brewButton')
      .click();

    cy.wait(500)
      .visit(Cypress.env('appUrl_Ingredients'));

    cy.get('#form-Coffee > .form-label')
      .should('contain.text', 'Coffee: 5g');
    cy.get('#form-Water > .form-label')
      .should('contain.text', 'Water: 0ml');
    cy.get('#form-Milk > .form-label')
      .should('contain.text', 'Milk: 10ml');
    cy.get('#form-Cocoa > .form-label')
      .should('contain.text', 'Cocoa: 10g');
  })

  /* Blocking brewing */
  it('Brewing second recipe is blocked by insufficient ingredients', () => {
    cy.get('#recipe-Americano > #brewButton')
      .click();

    cy.wait(500)
      .visit(Cypress.env('appUrl_Ingredients'));

    cy.get('#form-Sugar > .form-label')
      .should('contain.text', 'Sugar: 10g');
    cy.get('#form-Coffee > .form-label')
      .should('contain.text', 'Coffee: 5g');
    cy.get('#form-Water > .form-label')
      .should('contain.text', 'Water: 0ml');
    cy.get('#form-Milk > .form-label')
      .should('contain.text', 'Milk: 10ml');
    cy.get('#form-Cocoa > .form-label')
      .should('contain.text', 'Cocoa: 10g');

    cy.go('back');

    cy.get('#recipe-Latte\\ Macchiato > #brewButton')
      .click();

    cy.wait(500).go('forward');

    cy.get('#form-Sugar > .form-label')
      .should('contain.text', 'Sugar: 10g');
    cy.get('#form-Coffee > .form-label')
      .should('contain.text', 'Coffee: 5g');
    cy.get('#form-Water > .form-label')
      .should('contain.text', 'Water: 0ml');
    cy.get('#form-Milk > .form-label')
      .should('contain.text', 'Milk: 10ml');
    cy.get('#form-Cocoa > .form-label')
      .should('contain.text', 'Cocoa: 10g');
  })

  it('Original recipe can be brewn and triggers alert', () => {
    cy.get('#recipe-Americano')
      .contains('Brew Americano')
      .click();

    // https://applitools.com/blog/testing-browser-alerts-confirmations-prompts-cypress/
    cy.on('window:alert', (successAlert) => {
      expect(successAlert).to
        .contain('☕ Enjoy your freshly brewed Americano! ☕');
    });
  })

  it('Newly created recipe can be brewn and triggers alert', () => {
    cy.get('#name').type('Ristretto')
      .get('#waterAmount').type(5)
      .get('#coffeeAmount').type(10)
      .get('#submit-new-recipe').should('be.enabled').click();

    cy.get('#recipe-Ristretto')
      .contains('Brew Ristretto')
      .click();

    // ! Step failt, aber Gesamttest nicht.
    cy.on('window:alert', (successAlert) => {
      expect(successAlert).to
        .contain('☕ Enjoy your freshly brewed Ristretto! ☕');
    });
  })

  /* Page length doesn't cause issues */
  it('Bottommost brew button can be reached', () => {
    // Macht hier keinen Unterschied: cy.scrollTo('bottom');
    cy.get('#recipe-Hot\\ Chocolate > #brewButton')
      .should('be.visible');
  })
})
