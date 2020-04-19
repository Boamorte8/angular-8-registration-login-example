describe("User", () => {
    it("should register user", () => {
        cy.visit("/register");
        cy.get('#firstName').type('Michael');
        cy.get('#lastName').type('K');
        cy.get('#username').type('mk');
        cy.get('#password').type('qwerty');
        cy.get('#password').type('qwerty{enter}');
        // cy.get('.btn-primary').click();
        cy.url().should('include', '/login');
        cy.get('.alert').should('contain', 'successful');
    });
});