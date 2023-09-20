describe('The list page', () => {
  it('loading passes', () => {
    cy.visit('http://localhost:3000/list')
  })
})

describe('The Form page', () => {
  it('loading passes', () => {
    cy.visit('http://localhost:3000/form')
  })
})


describe('The Name Field', () => {
  it("Doesn't have a name", () => {
    cy.visit('http://localhost:3000/form')
    cy.get('input[name="event-date"]').clear();
    cy.get('input[type="submit"]').should('be.disabled');
  })
})

describe('The Date Field', () => {
  it("Doesn't have a date", () => {
    cy.get('input[name="event-date"]').clear();
    cy.get('input[type="submit"]').should('be.disabled');
  })
})

describe('The Date Field and The Name Field', () => {
  it("Does have a name and a date", () => {
    cy.get('input[name="event-name"]').clear().type('Doha');
    cy.get('input[name="event-date"]').clear().type('20/3/2020');
    cy.get('input[type="submit"]').should('be.enabled');
  })
})

/*
describe('The Name Field', () => {
  it("Doesn't have a name", () => {
    cy.get('input[name="name"]').clear();
    cy.get('.details > p').should('contain', "You need a name!!!");
  });

  it('Has a name', () => {
    cy.get('input[name="name"]').clear().type('Jane');
    cy.get('.details').should('contain', 'Jane');
  });
});

describe('The Gender field', () => {
  it('Has Female value', () => {
    cy.get('[type="radio"]').check('F');
  });
});

*/