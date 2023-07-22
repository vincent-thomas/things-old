// Button.stories.ts|tsx

import type { Meta, StoryObj } from '@storybook/react';
import { Avatar as A } from '.';

const meta: Meta<typeof A> = {
  component: A,
};

export default meta;

type Story = StoryObj<typeof A>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Avatar: Story = {
  render: (props) => <A {...props} />,
  args: {
    alt: 'This is the alternative text',
    src: 'https://images.unsplash.com/photo-1689613188405-a216e5a53fe8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=200',
    fallbackText: 'fallbackText',
  },
};
