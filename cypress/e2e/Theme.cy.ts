describe('Theme spec', () => {
  before(() => {
    cy.handleAuthStateAuto();
    localStorage.removeItem('colorMode');
  });

  beforeEach(() => {
    cy.visit('/');
  });

  it('should have default theme light', () => {
    cy.checkTheme('Light');
  });

  it('should change theme', () => {
    cy.changeTheme('Dark');
    cy.changeTheme('Light');
  });

  it('should persist theme in storage', () => {
    cy.changeTheme('Dark');
    cy.reload();
    cy.checkTheme('Dark');
  });
});
