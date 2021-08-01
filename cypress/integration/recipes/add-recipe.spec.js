/// <reference types="cypress" />

context('Ingredients - UI Tests', () => {
  beforeEach(() => {
    cy.resetRecipesTable();
    cy.visit(Cypress.env('appUrl_Recipes'));
  })

  after(() => {
    cy.resetRecipesTable();
  })

  /* General display tests */
  it('Recipe creation form is visible', () => {
    cy.get('#form-new-recipe').should('be.visible');
  })

  it('Requirements warning shown by default, including correct info', () => {
    cy.get('#requirements-warning')
      .should('be.visible')
      .and('contain.text', 'Recipes need a Name and at least one Ingredient.');
  })

  it('Submit button disabled before any interaction', () => {
    cy.get('#submit-new-recipe').should('be.disabled');
  })

  it('All ingredients show their correct unit', () => {
    cy.get('#coffeeAmount > label').should('contain.text', 'in g');
    cy.get('#waterAmount > label').should('contain.text', 'in ml');
    cy.get('#milkAmount > label').should('contain.text', 'in ml');
    cy.get('#cocoaAmount > label').should('contain.text', 'in g');
  })

  /* User interactions */
  it('Recipe name warning disappears after typing valid one', () => {
    cy.get('#name').type('Short Coffee Name');
    cy.get('#error-name-length')
      .should('not.exist');
    cy.get('#error-name-empty')
      .should('not.exist');
  })

  it('All ingredient amount fields can be typed in', () => {
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

  it('Submit button disabled when ingredient amounts are 0', () => {
    cy.get('#name').type('Disabled Empty Coffee');
    cy.get('#coffeeAmount').type('0');
    cy.get('#waterAmount').type('0');
    cy.get('#milkAmount').type('0');
    cy.get('#cocoaAmount').type('0');
    cy.get('#submit-new-recipe').should('be.disabled');
  })

  /* Alerts behave correctly */
  it('Error shown if name is shorter than 2 chars', () => {
    cy.get('#name').type('A');
    // click somewhere else to trigger error visibility
    cy.get('#form-new-recipe').click();
    cy.get('#error-name-length')
      .should('be.visible')
      .and('contain.text', 'Recipe names need 2 to 20 characters.');
  })

  it('Error shown if name clicked but left empty', () => {
    cy.get('#name').click();
    // click somewhere else to trigger error visibility
    cy.get('#form-new-recipe').click();
    cy.get('#error-name-empty')
      .should('be.visible')
      .and('contain.text', 'Recipes require a name.');
  })

  it('Submit button clickable after name and 1 ingredient given', () => {
    cy.get('#name').type('Test Recipe');
    cy.get('#waterAmount').type(8);
    cy.get('#submit-new-recipe').should('be.enabled').click();
  })

  /* Input sanitization */
  it('Recipe name is cut at 20 chars', () => {
    cy.get('#name')
      .find('input')
      .type('Best Coffee for TestERS')
      .should('have.value', 'Best Coffee for Test')
      .and('not.have.value', 'ERS');
  })

  it('Ingredient amounts are max 1.500 and never negative', () => {
    cy.get('#coffeeAmount > input').type('1501').should('have.value', '1500');
    cy.get('#milkAmount   > input').type('-1').should('have.value', '1');
  })

  /* Creating recipe with correct values */
  it('Values saved correctly in newly created recipe', () => {
    cy.get('#name').type('Lungo')
      .get('#coffeeAmount').type(8)
      .get('#waterAmount').type(10)
      .get('#submit-new-recipe').should('be.enabled').click();

    cy.get('#recipe-Lungo > h2')
      .should('contain.text', 'Lungo:');
    cy.get('#recipe-Lungo > table > tr:nth-child(1) > td:nth-child(2)')
      .should('contain', '8');
    cy.get('#recipe-Lungo > table > tr:nth-child(2) > td:nth-child(2)')
      .should('contain', '10');
    cy.get('#recipe-Lungo > table > tr:nth-child(3) > td:nth-child(2)')
      .should('contain', '0');
    cy.get('#recipe-Lungo > table > tr:nth-child(4) > td:nth-child(2)')
      .should('contain', '0');
  })
})
