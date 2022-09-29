/* TBD: For describe blocks when a blog(s) is created, change cy.contains() function calls to cy.get() function calls
Currently, test will break if blog title/author/URL contains "view/like/remove" */

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Danny Peng',
      username: 'dany',
      password: 'dracarys'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('log in')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('dany')
      cy.get('#password').type('dracarys')
      cy.get('#login-button').click()
      cy.contains('Danny Peng logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('dany')
      cy.get('#password').type('394394')
      cy.get('#login-button').click()
      cy.get('.error').should('contain', 'Wrong username or password')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('dany')
      cy.get('#password').type('dracarys')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('House of the Dragon')
      cy.get('#author').type('GRRM')
      cy.get('#url').type('www.hbo.com')
      cy.get('#submit-button').click()
      cy.contains('a new blog House of the Dragon added')

    })

  })

  describe('When a blog is created', function() {
    beforeEach(function() {
      cy.get('#username').type('dany')
      cy.get('#password').type('dracarys')
      cy.get('#login-button').click()
      cy.contains('new blog').click()
      cy.get('#title').type('House of the Dragon')
      cy.get('#author').type('GRRM')
      cy.get('#url').type('www.hbo.com')
      cy.get('#submit-button').click()
    })

    it('A blog can be liked', function() {
      cy.contains('view').click()
      cy.contains('like').click()
    })

    it('A blog can be deleted', function() {
      cy.contains('view').click()
      cy.contains('remove').click()
    })

  })

  describe('When multiple blogs have been created', function() {
    beforeEach(function() {
      cy.get('#username').type('dany')
      cy.get('#password').type('dracarys')
      cy.get('#login-button').click()
      cy.get('.blog-button').click()
      cy.get('#title').type('House of the Dragon')
      cy.get('#author').type('GRRM')
      cy.get('#url').type('www.hbo.com')
      cy.get('#submit-button').click()
      cy.get('.blog-button').click()
      cy.get('#title').type('Breaking Bad')
      cy.get('#author').type('Vince G')
      cy.get('#url').type('www.bb.com')
      cy.get('#submit-button').click()
      cy.get('.blog-button').click()
      cy.get('#title').type('Dune')
      cy.get('#author').type('Denis V')
      cy.get('#url').type('www.dune.com')
      cy.get('#submit-button').click()
    })

    it('Blogs are ordered by likes', function() {
      cy.wait(3000)
      cy.get('.blog').eq(0).contains('view').click()
      cy.get('.blog').eq(1).contains('view').click()
      cy.get('.blog').eq(2).contains('view').click()
      cy.get('.blog').eq(2).contains('like').click()
      cy.wait(500)
      cy.get('.blog').eq(0).contains('like').click()
      cy.get('.blog').eq(2).contains('like').click()
      cy.get('.blog').eq(0).should('contain', 'Dune')
    })

  })

})