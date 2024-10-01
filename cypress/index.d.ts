declare namespace Cypress {
  interface Chainable {
    signUp(data: UserCreate): Chainable<void>;
    signIn(data: UserCreate): Chainable<void>;
    handleAuthStateAuto(userRef?: Partial<UserCreate>): Chainable<void>;
    changeTheme(expect: string): Chainable<void>;
    checkTheme(expect: string): Chainable<void>;
    createTweet(withImage: boolean, context?: string): Chainable<void>;
  }
}
