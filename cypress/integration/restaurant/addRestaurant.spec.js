describe("When create a new restaurant", () => {
  before(() => {
    const user = Cypress.env("user");
    cy.login(user.email, user.password);
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  it("go to dashboard", () => {
    cy.get('[href="/dashboard"]').click();
    cy.url().should("include", "/dashboard");
  });

  it("create a new restaurant successfully", () => {
    const restaurant = Cypress.env("restaurant");

    cy.get('[name="rating"]').type(restaurant.rating);
    cy.get('[name="comment"]').type(restaurant.comment);
    cy.get('[type="submit"]').click();

    cy.get("form").contains("Create a new restaurant successfully");
  });
});
