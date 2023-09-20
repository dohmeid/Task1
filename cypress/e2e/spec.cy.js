//validate visiting the pages
describe('Visit the list page', () => {
  it('loading passes', () => {
    cy.visit('http://localhost:3000/list')
  })
})

describe('Visit the Form page', () => {
  it('loading passes', () => {
    cy.visit('http://localhost:3000/form')
  })
})

//validate the form input fields and the state of the button (enabled/disabled)
describe('The Name Field', () => {
  it("Doesn't have a name", () => {
    cy.visit('http://localhost:3000/form');
    cy.get('#event-name').clear();
    cy.get('input[type="submit"]').should('be.disabled');
  })
})

describe('The Date Field', () => {
  it("Doesn't have a date", () => {
    cy.visit('http://localhost:3000/form');
    cy.get('#event-date').clear();
    cy.get('input[type="submit"]').should('be.disabled');
  })
})

describe('The Date Field and The Name Field', () => {
  it("Does have a name and a date", () => {
    cy.visit('http://localhost:3000/form');
    cy.get('#event-name').clear().type('Doha');
    cy.get('#event-date').clear().type('2023-09-20T12:30');
    cy.get('input[type="submit"]').should('be.enabled');
  })

  it("Does have a name but no date", () => {
    cy.visit('http://localhost:3000/form');
    cy.get('#event-name').clear().type('Doha');
    cy.get('#event-date').clear();
    cy.get('input[type="submit"]').should('be.disabled');
  })

  it("Does have a date but no name", () => {
    cy.visit('http://localhost:3000/form');
    cy.get('#event-name').clear();
    cy.get('#event-date').clear().type('2023-09-20T12:30');
    cy.get('input[type="submit"]').should('be.disabled');
  })
})

//validate the buttons functionality
describe('Check the cancel button', () => {
  it('click cancel', () => {
    cy.visit('http://localhost:3000/form');
    cy.get('#cancel-button').click();
    cy.location('pathname').should('eq', '/list');
  })
})

/*
describe('Check the submit button', () => {
  it('click submit', () => {
    cy.visit('http://localhost:3000/form');
    cy.get('#submit-button').click();
    cy.location('pathname').should('eq', '/list');
  })
})
*/

describe('Check the new+ button', () => {
  it('click new+', () => {
    cy.visit('http://localhost:3000/list');
    cy.get('#new-button').click();
    cy.location('pathname').should('eq', '/form');
  })
})

/*
describe('Check clicking a div', () => {
  it('click on a div', () => {
    cy.visit('http://localhost:3000/list');
    cy.get('.card').click();
    cy.location('pathname').should('eq', '/form/edit');
  })
})
*/




