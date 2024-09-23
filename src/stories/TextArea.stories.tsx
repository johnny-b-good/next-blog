import type { Meta, StoryObj } from "@storybook/react";

import { Textarea } from "@/ui";

const meta = {
  title: "Components/Textarea",
  component: Textarea,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Textarea>;

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
