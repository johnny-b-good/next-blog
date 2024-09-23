import type { Meta, StoryObj } from "@storybook/react";

import { Input } from "@/ui";

const meta = {
  title: "Components/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Placeholder: Story = {
  args: {
    placeholder: "Placeholder",
  },
};

export const WithValue: Story = {
  args: {
    value: "Some value",
  },
};

export const Invalid: Story = {
  args: {
    value: "Bad value!",
    invalid: true,
  },
};
