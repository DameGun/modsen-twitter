import type { UserCreate } from '@/entities/user/types/auth';

describe('Authentication spec', () => {
  describe('Sign up', () => {
    beforeEach(() => {
      indexedDB.deleteDatabase('firebaseLocalStorageDb');
    });

    it('should fail sign up with validation errors', () => {
      cy.fixture<UserCreate>('auth/userIncorrect').then((user) => {
        cy.signUp(user);

        cy.get('button[type="submit"]').should('be.disabled');
      });
    });

    it('should pass sign up validation', () => {
      cy.fixture<UserCreate>('auth/userCorrect').then((user) => {
        cy.signUp(user);

        cy.get('button[type="submit"]').should('be.enabled');
      });
    });
  });

  describe('Sign in', () => {
    beforeEach(() => {
      indexedDB.deleteDatabase('firebaseLocalStorageDb');
    });

    it('should fail sign in with invalid credentials', () => {
      cy.fixture<UserCreate>('auth/userIncorrect').then((user) => {
        cy.signIn(user);

        cy.wait(2000);
        cy.get('body').should('contain', 'Invalid credentials');
      });
    });

    it('should pass sign in', () => {
      cy.fixture<UserCreate>('auth/userCorrect').then((user) => {
        cy.signIn(user);

        cy.wait(2000);
        cy.location('pathname').should('eq', '/feed');
      });
    });
  });
});
