

describe('Note app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset/');
    const user = {
      username: 'root',
      name: 'root',
      password: 'password'
    };
    cy.request('POST', 'http://localhost:3003/api/users/', user);
    cy.visit('http://localhost:3000');
  });

  it('login form is showing', function() {
    cy.get('#username').parent().contains('username');
    cy.get('#password').parent().contains('password');
    cy.get('#loginButton').contains('login');
  });

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('root');
      cy.get('#password').type('password');
      cy.get('#loginButton').click();
      cy.contains('root logged in');
    });

    it('fails with wrong password', function () {
      cy.get('#username').type('root');
      cy.get('#password').type('wrong');
      cy.get('#loginButton').click();
      cy.get('.notification')
        .should('contain', 'invalid username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid');
    });
  });

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'root', password: 'password' });
    });

    it('a new blog can be created', function() {
      cy.createBlog({ title: 'new blog created by cypress', author: 'unknown', url: 'blog url' });
      cy.contains('new blog created by cypress');
    });
  });

});