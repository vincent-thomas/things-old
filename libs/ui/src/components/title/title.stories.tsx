import type { Meta, StoryObj } from "@storybook/react";
import { Title as Comp } from ".";

const meta: Meta<typeof Comp> = {
  title: "Title",
  component: ({ ...args }) => <Comp {...args} />,
  args: {
    children: "Click Me",
    removeStyles: false
  }
};

export default meta;

type Story = StoryObj<typeof Comp>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */

export const Normal: Story = {
  args: {
    removeStyles: false
  }
};

export const NoStyle: Story = {
  args: {
    removeStyles: true
  }
};

export const Class: Story = {
  args: {
    UNSAFE_className: "test-class"
  }
};
