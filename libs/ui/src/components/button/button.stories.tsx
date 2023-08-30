// Button.stories.ts|tsx

import type { Meta, StoryObj } from "@storybook/react";
import { Button as Comp } from ".";

const meta: Meta<typeof Comp> = {
  title: "Button",
  component: ({ ...args }) => <Comp {...args} />,
  args: {
    children: "Click Me",
    disabled: false
  }
};

export default meta;

type Story = StoryObj<typeof Comp>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */

export const Default: Story = {
  args: {
    variant: "default"
  }
};

export const Destructive: Story = {
  args: {
    variant: "destructive"
  }
};

export const Ghost: Story = {
  args: {
    variant: "ghost"
  }
};

export const Link: Story = {
  args: {
    variant: "link"
  }
};

export const Outline: Story = {
  args: {
    variant: "outline"
  }
};
