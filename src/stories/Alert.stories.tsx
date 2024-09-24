import type { Meta, StoryObj } from "@storybook/react";

import { Alert } from "@/ui";

const meta = {
  title: "Components/Alert",
  component: Alert,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
  args: {
    children: "Hello world!",
    status: "success",
  },
};

export const Warning: Story = {
  args: {
    children: "Something bad may happen!",
    status: "warning",
  },
};

export const Error: Story = {
  args: {
    children: "Something bad happened :(",
    status: "error",
  },
};
