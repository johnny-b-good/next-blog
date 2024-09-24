import type { Meta, StoryObj } from "@storybook/react";

import { Breadcrumbs } from "@/ui";

const meta = {
  title: "Components/Breadcrumbs",
  component: Breadcrumbs,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Breadcrumbs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    parts: [{ text: "Store", url: "/store" }, { text: "Orders" }],
  },
};
