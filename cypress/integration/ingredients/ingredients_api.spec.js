/// <reference types="cypress" />

context.skip('Ingredients - API Tests', () => {
    beforeEach(() => {
        cy.resetIngredientsTable();
        cy.visit(Cypress.env('appUrl_Ingredients'));
    })

    // TODO: Write API-Tests
})
