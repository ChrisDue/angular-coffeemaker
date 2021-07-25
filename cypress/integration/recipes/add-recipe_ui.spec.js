/// <reference types="cypress" />

context('Ingredients - UI Tests', () => {
  beforeEach(() => {
    cy.resetRecipesTable();
    cy.visit(Cypress.env('appUrl_Recipes'));
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
    cy.get('#coffeeAmount > label').should('contain', 'in g');
  })

  /* User interactions */
  it('Recipe name can be typed', () => {
    cy.get('#name').type('Short Coffee Name');
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

  it('Submit Button disabled when ingredient amounts are 0', () => {
    cy.get('#name').type('Disabled Empty Coffee');
    cy.get('#coffeeAmount').type('0');
    cy.get('#waterAmount').type('0');
    cy.get('#milkAmount').type('0');
    cy.get('#cocoaAmount').type('0');
    cy.get('#submit-new-recipe').should('be.disabled');
  })

  /* Input sanitization */
  it('Error shown if name is shorter than 2 chars', () => {
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

  it.only('Recipe name is cut at 20 chars', () => {
    cy.get('#name')
      .find('input')
      .type('Best Coffee for TestERS')
      .should('have.value', 'Best Coffee for Test')
      .and('not.have.value', 'ERS');
  })

  it.only('Ingredient amounts are max 1.500 and never negative', () => {
    cy.get('#coffeeAmount > input').type('1501').should('have.value', '1500');
    cy.get('#milkAmount   > input').type('-1')  .should('have.value', '1');
  })

  // TODO Text-Stand hier 
  it('Ingredient amounts are saved correctly in newly created recipe', () => {
    cy.get('#name').type('Test Recipe');
    cy.get('#waterAmount').type(1);
    cy.get('#submit-new-recipe').should('be.enabled').click();
    // Von Cypress:#recipe-Test\ Recipe > table.indented > :nth-child(2) > [align="right"]
    // Von Chrome: #recipe-Test\ Recipe > table > tr:nth-child(2) > td:nth-child(2)
    cy.get('#recipe-Test\\ Recipe > table > tr:nth-child(2) > td:nth-child(2)')
      .should('contain', '1');
  })

  /* Recipes can be brewn */
  // TODO from here on down -->
  it('Original recipes can be brewn', () => {
    cy.resetIngredientsTable();

    cy.get('#recipe-Americano')
      .contains('Brew Americano')
      .click();

    // https://applitools.com/blog/testing-browser-alerts-confirmations-prompts-cypress/
    cy.on('window:alert', (text) => {
      expect(text).to
        .contain('☕ Enjoy your freshly brewed Americano! ☕');
    });

    cy.resetIngredientsTable();
  })

  it('Newly created recipes can be brewn', () => {
    cy.resetIngredientsTable();

    cy.get('#name').type('Ristretto')
      .get('#waterAmount').type(5)
      .get('#coffeeAmount').type(10)
      .get('#submit-new-recipe').should('be.enabled').click();

    cy.get('#recipe-Ristretto')
      .contains('Brew Ristretto')
      .click();

    // ! Failt nicht
    cy.on('window:alert', (text) => {
      expect(text).to
        .contain('☕ Enjoy your freshly brewed Ristretto! ☕');
    });

    cy.resetIngredientsTable();
  })

  it('Reset', () => {
    cy.resetIngredientsTable();
  })

  /* Alerts behave correctly */
  it.skip('No alerts displayed before interaction', () => {
    cy.get('.alert').should('not.exist');
  })

  it.skip('Empty amount triggers alert', () => {
    cy.get('#amount-Coffee').click();
    cy.get('#ingredient-Coffee').find('label').click();
    cy.get('.alert').should('be.visible');
  })

  it.skip('Empty amount alert text correct', () => {
    cy.get('#amount-Coffee').click();
    cy.get('#ingredient-Coffee').find('label').click();
    cy.get('.alert').should('be.visible');
  })

  it.skip('Empty amount alert disappears after inserting one', () => {
    cy.get('#amount-Milk').type(1);
    cy.get('#button-Milk').should('be.enabled').click();
    cy.get('.alert').should('not.exist');
  })

  /* Page length doesn't cause issues */
  it.only('Bottommost brew button can be reached', () => {
    cy.scrollTo('bottom');
    cy.get('#recipe-Hot\\ Chocolate > #brewButton')
      .should('be.visible');
  })
})
