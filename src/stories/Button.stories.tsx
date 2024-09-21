import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { Button } from "@/ui";

const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  // args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: "default",
    children: "Button",
  },
};

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Button",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: "Button",
  },
};
