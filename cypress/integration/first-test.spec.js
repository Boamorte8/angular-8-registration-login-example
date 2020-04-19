describe("First test", () => {
    it("should visit register page on register button click", () => {
        cy.visit("/login");
        // cy.visit("http://localhost:4200/login");

        cy.get('.btn-link').click();
        cy.url().should('include', '/register');
    });
    it("should login with correct data", () => {
        cy.visit("/login");
        cy.get('#username').type(Cypress.config('username'));
        cy.get('#password').type(Cypress.config('password'));
    });
});