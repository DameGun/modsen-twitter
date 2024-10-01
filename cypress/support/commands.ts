/// <reference types="cypress" />

import type { UserCreate } from '@/entities/user/types/auth';

Cypress.Commands.add('signUp', (data: UserCreate) => {
  cy.visit('/');
  cy.wait(1000);

  cy.get('a[href="/signup"]').click();

  cy.get('input[name="email"]').type(data.email);
  cy.get('input[name="password"]').type(data.password);
  cy.get('input[name="fullName"]').type(data.fullName);
  cy.get('input[name="userName"]').type(data.userName);
});

Cypress.Commands.add('signIn', (data: UserCreate) => {
  cy.visit('/');
  cy.wait(1000);

  cy.get('a[href="/signin"]').click();

  cy.get('input[name="email"]').type(data.email);
  cy.get('input[name="password"]').type(data.password);
  cy.get('button[type="submit"]').click();
});

Cypress.Commands.add('handleAuthStateAuto', (userRef?: Partial<UserCreate>) => {
  return cy.fixture('auth/userCorrect').then((user) => {
    cy.debug(user);
    indexedDB
      .databases()
      .then((dbs) => {
        if (!dbs.find((db) => db.name === 'firebaseLocalStorageDb')) {
          cy.signIn(user);
        }
      })
      .catch((err) => {
        cy.debug(err);
      });
    if (userRef) Object.assign(userRef, user);
  });
});

Cypress.Commands.add('checkTheme', (expect: string) => {
  cy.get('button[role="switch"]').invoke('attr', 'aria-roledescription').should('equal', expect);
});

Cypress.Commands.add('changeTheme', (expect: string) => {
  cy.get('button[role="switch"]').click();
  cy.checkTheme(expect);
});

Cypress.Commands.add('createTweet', (withImage, context) => {
  if (context) {
    cy.get(context).find('textarea[name="content"]').type('Test tweet content');
    if (withImage) {
      cy.get(context)
        .find('input[type="file"]')
        .selectFile('cypress/fixtures/tweet/test-image.jpg', { force: true });
      cy.get(context).find('div[data-testid="tweet-image-preview"]');
    }
    cy.get(context).find('button[type="submit"]').click();
  } else {
    cy.get('textarea[name="content"]').type('Test tweet content');
    if (withImage) {
      cy.get('input[type="file"]').selectFile('cypress/fixtures/tweet/test-image.jpg', {
        force: true,
      });
      cy.get('div[data-testid="tweet-image-preview"]');
    }
    cy.get('button[type="submit"]').click();
  }

  cy.get('body').should('contain', 'Test tweet content');
});
