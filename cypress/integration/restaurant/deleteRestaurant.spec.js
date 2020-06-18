describe("When delete a restaurant", () => {
  before(() => {
    const user = Cypress.env("user");
    cy.login(user.email, user.password);
    cy.get('[href="/dashboard"]').click();
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  it("should show confirm modal", () => {
    cy.get(
      "tbody > tr:nth-child(1) > td:nth-child(7) > button:nth-child(2)"
    ).click();
    cy.get(".MuiDialog-paper").should("be.visible");
  });

  it("should delete a plan successfully", () => {
    cy.get(".MuiButton-textPrimary").click();
    cy.get("tbody tr").should("not.exist");
  });
});
