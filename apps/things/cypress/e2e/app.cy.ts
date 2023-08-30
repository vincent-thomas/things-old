describe("info", () => {
  beforeEach(() => cy.visit("/"));

  it("should display welcome message", () => {
    cy.title().should("equal", "thingsSuite | Home");
    cy.get(".line").should("be.visible");
    // Custom command example, see `../support/commands.ts` file
    // cy.login('my-email@something.com', 'myPassword');
    // Function helper example, see `../support/app.po.ts` file
    // getGreeting().contains(/Welcome/);
  });
});
