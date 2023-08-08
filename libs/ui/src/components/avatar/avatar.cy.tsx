import { Avatar } from '.';

describe("Avatar", () => {
  it('Renders', () => {
    cy.mount(<Avatar src="https://images.unsplash.com/photo-1689613188405-a216e5a53fe8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=200" alt="test" fallbackText='testing'/>);
  });
  it("Displays url correctly", () => {
    cy.mount(<Avatar src="https://images.unsplash.com/photo-1689613188405-a216e5a53fe8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=200" alt="test" fallbackText='testing'/>);

    const el = cy.get("img");
    el.should("exist")
    cy.should("have.attr", "alt", "test")
    cy.should("have.attr", "src", "https://images.unsplash.com/photo-1689613188405-a216e5a53fe8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=200")

  })

  it("Displays fallbackText when url incorrect", () => {
    cy.mount(<Avatar src="https://notexistts.com" alt="test" fallbackText='testing' data-test="image" />);

    const el = cy.get("[data-test='image']");
    el.should("exist")

    // TODO testa att fallbackText finns
  })
});
