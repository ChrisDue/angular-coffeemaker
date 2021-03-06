/// <reference types="cypress" />

context('Ingredients', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200')
  })

  // copy of "actions"

  it.only('Header texts and links are correct', () => {
    // Check header title
    cy.get('.header').find('h1')
      .should('have.text', 'I\'m Your Smart Coffeemaker')
    // Check links by text and forwarding by url 
    cy.get('a').contains('Recipes').click()
    cy.url().should('include', '/recipes')
    cy.get('a').contains('Ingredients').click()
    cy.url().should('include', '/ingredients')
    cy.get('a').contains('About').click()
    cy.url().should('include', '/about')
  })
})
