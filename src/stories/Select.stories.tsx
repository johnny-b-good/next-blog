import type { Meta, StoryObj } from "@storybook/react";

import { Select } from "@/ui";

const meta = {
  title: "Components/Select",
  component: Select,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    options: [
      { label: "Russia", value: "ru" },
      { label: "Japan", value: "jp" },
      { label: "China", value: "cn" },
    ],
  },
};

export const Invalid: Story = {
  args: {
    options: [
      { label: "Russia", value: "ru" },
      { label: "Japan", value: "jp" },
      { label: "China", value: "cn" },
    ],
    invalid: true,
  },
};
