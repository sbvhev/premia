describe("When a new user signup", () => {
  const user = Cypress.env("user");

  before(() => {
    cy.visit("/signup");
  });

  it("should require input fields", () => {
    cy.get('[name="email"]').type(user.email);
    cy.get('[name="password"]').type(user.password);
    cy.get('[name="passwordConfirm"]').type(user.password);
    cy.get('[type="submit"]').click();

    cy.get("form").contains("First Name is required");
  });

  it("should create a new user successfully", () => {
    cy.get('[name="email"]').type(user.email);
    cy.get('[type="submit"]').click();

    cy.url().should("include", "/signup");
  });
});
