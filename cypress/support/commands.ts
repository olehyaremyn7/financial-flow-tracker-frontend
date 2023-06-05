Cypress.Commands.add('getDataCy', (value) => cy.get(`[data-cy="${value}"]`));

export {};

declare global {
  namespace Cypress {
    interface Chainable {
      getDataCy(value: string): Chainable<JQuery<HTMLElement>>;
    }
  }
}
