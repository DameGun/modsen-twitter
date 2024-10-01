import { UserCreate } from '@/entities/user/types/auth';

describe('Profile spec', () => {
  const currentUser: Partial<UserCreate> = {};

  before(() => {
    cy.handleAuthStateAuto(currentUser);
  });

  describe('Profile data', () => {
    it('should display the current user data', () => {
      cy.visit('/feed');
      cy.get('a').contains('Profile').click();

      cy.get('body').should('contain', currentUser.fullName);
      cy.get('body').should('contain', `@${currentUser.userName}`);
    });

    it('should be able to change user data', () => {
      cy.visit('/feed');
      cy.get('a').contains('Profile').click();

      cy.get('body').contains('Edit profile').click();
      cy.get('input[name="fullName"]').clear().type('Cypress Test User Changed');
      cy.get('textarea[name="bio"]').clear().type('Cypress Test User Bio');

      cy.get('select[name="month"]').select('June').should('have.value', 'June');
      cy.get('select[name="day"]').select('25').should('have.value', '25');
      cy.get('select[name="year"]').select('2004').should('have.value', '2004');

      cy.get('button[type="submit"]').click();

      cy.get('body').should('contain', 'Cypress Test User Changed');
      cy.get('body').should('contain', 'Cypress Test User Bio');
    });
  });

  describe('Profile interactions', () => {
    it('should display the other user data and follow button', () => {
      cy.visit('/primak2506');

      cy.get('body').should('contain', `@primak2506`);
      cy.get('body').should('contain', 'Follow');
    });

    it('should be able to follow the user', () => {
      cy.visit('/primak2506');

      cy.get('button').contains('Follow').click();
      cy.wait(1000);
      cy.get('button').should('contain', 'Following');
    });

    it('should be able to unfollow the user', () => {
      cy.visit('/primak2506');

      cy.get('button').contains('Following').click();
      cy.get('button').contains('Unfollow').click();
      cy.wait(1000);
      cy.get('button').should('contain', 'Follow');
    });
  });
});
