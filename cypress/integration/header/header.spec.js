/// <reference types="cypress" />

context('Header', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200')
  })

  // copy of "actions"

  it('shows correct texts and uses correct links', () => {
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

  it.only('looks the same on every page', () => {
    cy.get('.header')
      .toMatchImageSnapshot();


    // cy.visit('recipes')


    // cy.visit('ingredients')


    // cy.visit('about')

  })
})
