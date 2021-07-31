/// <reference types="cypress" />

context('Ingredients - UI Tests', () => {
  beforeEach(() => {
    cy.resetRecipesTable();
    cy.resetIngredientsTable();
    cy.visit(Cypress.env('appUrl_Recipes'));
  })

  /* Recipes can be brewn */
  it('Original recipes can be brewn', () => {
    cy.get('#recipe-Americano')
      .contains('Brew Americano')
      .click();

    // https://applitools.com/blog/testing-browser-alerts-confirmations-prompts-cypress/
    cy.on('window:alert', (successAlert) => {
      expect(successAlert).to
        .contain('☕ Enjoy your freshly brewed Americano! ☕');
    });
  })

  it('Newly created recipes can be brewn', () => {
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
