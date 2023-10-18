import ings from '../../src/mocks/ingredients.mock.json';
import order from '../../src/mocks/order.mock.json';
import { registeredUser as user } from '../../src/mocks/user.mock';
import { setTokens } from '../../src/utils/tokens';

describe('burger-constructor', () => {
  beforeEach(() => {
    cy.viewport(1200, 900);
    cy.visit('/');
    cy.intercept('GET', 'api/ingredients', { body: ings });
    cy.intercept('POST', 'api/auth/login', { body: user });
    cy.intercept('POST', 'api/orders', { body: order });
  });

  it('modal ingredient', () => {
    cy.get('[data-testid="bun"]').first().click();
//  cy.get('#react-modals').should('contains.text', ings.data[0].name);
    cy.get('#react-modals').should('contains.text', ings.data.find(x => x.type === 'bun')?.name);
    cy.get('[data-testid="closeModal"]').click();
    cy.get('#react-modals').should('be.empty');
  });

  it('dnd + modal order', () => {
    // dnd
    cy.get('[data-testid="buttonOrder"]').should('be.disabled');
    cy.get('[data-testid="bun"]:first').trigger('dragstart');
    cy.get('[data-testid="dropZone"]').trigger('drop');
    cy.get('[data-testid="main"]:first').trigger('dragstart');
    cy.get('[data-testid="dropZone"]').trigger('drop');
    cy.get('[data-testid="sauce"]:first').trigger('dragstart');
    cy.get('[data-testid="dropZone"]').trigger('drop');
    cy.get('[data-testid="buttonOrder"]').should('be.enabled');

    // login
    cy.get('[data-testid="buttonOrder"]').click();
    cy.get('input[name="email"]').type(user.user.email);
    cy.get('input[name="password"]').type('12345');
    cy.get('button[type="submit"]').click();
    setTokens(user);

    // alternative way for set `user` to `store`
    // https://www.cypress.io/blog/2018/11/14/testing-redux-store#dispatch-actions

    // order
    cy.get('[data-testid="buttonOrder"]').click();
    cy.get('[data-testid="orderNumber"]').should('have.text', order.order.number);
    cy.get('#react-modals').contains('идентификатор заказа');
  });
});
