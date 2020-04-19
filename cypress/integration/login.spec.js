describe("Login", () => {
    beforeEach(() => {
        cy.fixture('users').then((users) => {
            localStorage.setItem('users', JSON.stringify(users));
        });
    });

    it("should login user", () => {
        cy.visit("/login");
        cy.get('#username').type(Cypress.config('username'));
        cy.get('#password').type(Cypress.config('password'));
        cy.get('.btn-primary').click();

        cy.get('h1').should('contain', 'Hi Michael');
    });
});


describe('Login Page 2', () => {
    // To call a command
    // before(() => {
    //     cy.login();
    // });
    beforeEach(() => {
      // Start server to listen to routes.
        cy.server();

        // The ** wildcard character sequence matches a partial path.
        // We listen for POSTs where the URL ends with /authenticate.
        // Alias the route with 'as()' to find it later.
        cy.route('POST', '**/authenticate').as('authenticate');
    });

    it('user can log in', function () {

        cy.visit("/login");
        cy.get('#username').type(Cypress.config('username'));
        cy.get('#password').type(Cypress.config('password'));

        // When we submit the form an async XHR call is made.
        cy.get('.btn-primary').click();

        // If we want to use values that are return from the server then we can use wait.then
        // cy.wait('@authenticate').then((response) => {
        //     localStorage.setItem('token', response.body);
        //  });
        // It is also possible to wait for a number of milliseconds with cy.wait(1000)

        // We wait until the call with the alias authenticate is resolved.
        cy.wait('@authenticate').then((response) => {
            localStorage.setItem('token', response.body);
        });

        // If we don't wait the assertion is false.
        cy.get('h1').should('contain', 'Hi Michael');
    });
});