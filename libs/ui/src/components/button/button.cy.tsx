import { Button } from ".";

describe("Button", () => {
  it("Renders", () => {
    cy.mount(<Button />);
  });
  it("Displays children correctly", () => {
    cy.mount(<Button>child</Button>);
    cy.root().should("contain", "child");
    cy.mount(<Button>child 2</Button>);
    cy.root().should("contain", "child 2");
  });

  it("Displays disabled correctly", () => {
    cy.mount(<Button disabled>child</Button>);
    const element = cy.get("[disabled]");
    element.should("exist");
    element.should("not.be.enabled");
    element.should("contain", "child");
  });

  it("Check UNSAFE_className works", () => {
    cy.mount(
      <Button UNSAFE_className="test" data-test="test">
        child
      </Button>
    );
    const el = cy.get('[data-test="test"');
    // TODO: Kolla om class finns
    el.should("exist");
  });
});
