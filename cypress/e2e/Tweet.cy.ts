describe('Tweet spec', () => {
  before(() => {
    cy.handleAuthStateAuto();
  });

  beforeEach(() => {
    cy.visit('/');
    cy.wait(1000);
  });

  afterEach(() => {
    cy.get('body')
      .get('div')
      .contains('Test tweet content')
      .parent()
      .siblings()
      .first()
      .find('button[data-testid="toggle-delete"]')
      .click();
    cy.get('button[data-testid="delete-post"]').click();
    cy.wait(1000);
  });

  describe('Create Tweet', () => {
    it('should create a tweet with content only', () => {
      cy.createTweet(false);
    });

    it('should create a tweet with content and image', () => {
      cy.createTweet(true);
    });

    it('should create a tweet in modal with content only', () => {
      cy.get('button[data-testid="create-post"]').click();

      cy.createTweet(false, 'div[data-testid="create-post-modal"]');
      cy.wait(1000);
    });

    it('should create a tweet in modal with content and image', () => {
      cy.get('button[data-testid="create-post"]').click();

      cy.createTweet(true, 'div[data-testid="create-post-modal"]');
      cy.wait(1000);
    });
  });
});
