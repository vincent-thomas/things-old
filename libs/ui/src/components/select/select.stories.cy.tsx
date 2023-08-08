import meta from './select.stories';

describe(meta.title as string, () => {
  it('renders', () => {
    cy.mount(<meta />);
  });
});
