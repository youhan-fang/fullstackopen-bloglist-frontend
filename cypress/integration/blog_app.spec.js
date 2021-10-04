

describe('Note app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset/');
    // const user = {
    //   username: 'root',
    //   password: 'password'
    // };
    // cy.request('POST', 'http://localhost:3001/api/users/', user);
    cy.visit('http://localhost:3000');
  });

  it('login form is showing', function() {
    cy.get('#username').parent().contains('username');
    cy.get('#password').parent().contains('password');
    cy.get('#loginButton').contains('login');
  });

});