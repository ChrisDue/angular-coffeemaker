/// <reference types="cypress" />

context('Header', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200')
  })

  it('shows correct headline', () => {
    // Check header title
    cy.get('.header').find('h1')
      .should('have.text', 'I\'m Your Smart Coffeemaker')
  })

  it('forwards correctly', () => {
    // Check links by text and forwarding by url 
    cy.get('a').contains('Recipes').click()
    cy.url().should('include', '/recipes')
    cy.get('a').contains('Ingredients').click()
    cy.url().should('include', '/ingredients')
    cy.get('a').contains('About').click()
    cy.url().should('include', '/about')
  })

  it.skip('looks the same on every page', () => {
    cy.visit('http://localhost:4200/recipes')
    cy.get('.header').toMatchImageSnapshot();

    cy.visit('http://localhost:4200/ingredients')
    cy.get('.header').toMatchImageSnapshot();

    cy.visit('http://localhost:4200/about')
    cy.get('.header').toMatchImageSnapshot();
  })
})
