import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import {
  UserIcon,
  UserPlusIcon,
  UserMinusIcon,
} from "@heroicons/react/24/outline";

import { DropdownMenu } from "@/ui";

const meta = {
  title: "Components/DropdownMenu",
  component: DropdownMenu,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    onClick: fn(),
  },
} satisfies Meta<typeof DropdownMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      {
        key: 1,
        label: "User profile",
        icon: <UserIcon className="size-6" />,
      },
      {
        key: 2,
        label: "Add user",
        icon: <UserPlusIcon className="size-6" />,
      },
      {
        key: 3,
        label: "Delete user",
        icon: <UserMinusIcon className="size-6" />,
        disabled: true,
      },
    ],
    onClick: fn(),
  },
};
