

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

    it('user can like a blog', function() {
      cy.createBlog({ title: 'a blog to be liked', author: 'unknown', url: 'blog url' });
      cy.contains('a blog to be liked').parent().contains('view').click();
      cy.get('#likeButton').click();
      cy.get('.blogLikes').contains('1');
    });

    describe('delete blog', function() {
      it('a user can delete the blog created by him/her', function() {
        cy.createBlog({ title: 'a blog to be deleted', author: 'unknown', url: 'blog url' });
        cy.contains('a blog to be deleted').parent().contains('view').click();
        cy.get('#removeButton').click();
        cy.contains('a blog to be deleted').should('not.exist');
      });

      it('a user cannot delete the blog not created by him/her', function() {
        cy.createBlog({ title: 'a blog not to be deleted', author: 'unknown', url: 'blog url' });
        cy.get('#logoutButton').click();
        const user = {
          username: 'another',
          name: 'another',
          password: 'password'
        };
        cy.request('POST', 'http://localhost:3003/api/users/', user);
        cy.login({ username: 'another', password: 'password' });
        cy.contains('a blog not to be deleted').parent().contains('view').click();
        cy.get('#removeButton').should('not.exist');
      });
    });

    describe('sort blog', function() {
      it('blogs are sorted by likes', function() {
        cy.createBlog({ title: 'blog one', author: 'unknown', url: 'blog url', likes: 10 });
        cy.createBlog({ title: 'blog two', author: 'unknown', url: 'blog url', likes: 5 });
        cy.createBlog({ title: 'blog three', author: 'unknown', url: 'blog url', likes: 15 });
        cy.get('.blogEntry').eq(0).should('contain.text', 'blog three');
        cy.get('.blogEntry').eq(1).should('contain.text', 'blog one');
        cy.get('.blogEntry').eq(2).should('contain.text', 'blog two');
      });
    });
  });
});