import type { Meta, StoryObj } from "@storybook/react";

import { FormField, Input, Checkbox } from "@/ui";

const meta = {
  title: "Components/FormField",
  component: FormField,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof FormField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Form field label",
    description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
    children: <Input placeholder="Placeholder" />,
  },
};

export const WithErrors: Story = {
  args: {
    label: "Form field label",
    description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
    children: <Input placeholder="Placeholder" invalid />,
    errors: ["Bad value", "Very bad value"],
  },
};

export const WithCheckbox: Story = {
  args: {
    label: "Form field label",
    description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
    children: <Checkbox />,
    labelPosition: "right",
  },
};
