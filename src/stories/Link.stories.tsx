import type { Meta, StoryObj } from "@storybook/react";

import { Link } from "@/ui";

const meta = {
  title: "Components/Link",
  component: Link,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "http://example.com",
    href: "http://example.com",
  },
};
