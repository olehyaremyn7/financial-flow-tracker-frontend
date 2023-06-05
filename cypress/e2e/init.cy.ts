describe('Just visit e2e test', (): void => {
  it('should visit', (): void => {
    cy.visit('/');
    cy.getDataCy('title').contains('Hello world');
  });
});
