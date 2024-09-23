import type { Meta, StoryObj } from "@storybook/react";

import { LinkButton } from "@/ui";

const meta = {
  title: "Components/LinkButton",
  component: LinkButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof LinkButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Button",
    href: "http://example.com",
  },
};

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Button",
    href: "http://example.com",
  },
};

export const Text: Story = {
  args: {
    variant: "text",
    children: "Button",
    href: "http://example.com",
  },
};
