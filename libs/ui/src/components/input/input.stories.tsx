import type { Meta, StoryObj } from "@storybook/react";
import { Input as Comp } from ".";

const meta: Meta<typeof Comp> = {
  component: Comp,
  args: {
    placeholder: "Skriv här..."
  }
};

export default meta;

type Story = StoryObj<typeof Comp>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */

export const Input: Story = {
  name: Comp.displayName
};
