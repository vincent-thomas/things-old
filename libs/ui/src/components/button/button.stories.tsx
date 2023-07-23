// Button.stories.ts|tsx

import type { Meta, StoryObj } from '@storybook/react';
import { Button as Comp } from '.';

const meta: Meta<typeof Comp> = {
  component: Comp,
};

export default meta;

type Story = StoryObj<typeof Comp>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */

export const Button: Story = {
  name: Comp.displayName,
  args: {
    variant: 'default',
    children: 'Button',
  },
  argTypes: { onClick: { action: 'clicked' } },
  parameters: {
    variant: {
      values: {
        name: 'default',
        value: 'default',
      },
      destructive: {
        name: 'destructive',
        value: 'destructive',
      },
      outline: {
        name: 'outline',
        value: 'outline',
      },
      ghost: {
        name: 'ghost',
        value: 'ghost',
      },
      link: {
        name: 'link',
        value: 'link',
      },
    },
  },
};
