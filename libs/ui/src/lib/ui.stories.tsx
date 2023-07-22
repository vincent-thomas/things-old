// Button.stories.ts|tsx

import type { Meta, StoryObj } from '@storybook/react';
import { Ui } from './ui';

const meta: Meta<typeof Ui> = {
  component: Ui,
};

export default meta;
type Story = StoryObj<typeof Ui>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const UUI: Story = {
  render: () => <Ui />,
};
