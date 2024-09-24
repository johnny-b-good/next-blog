import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Fragment, useState } from "react";

import { Dialog, Button } from "@/ui";

const meta = {
  title: "Components/Dialog",
  component: Dialog,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {
    onOk: fn(),
    onCancel: fn(),
  },
  decorators: [
    (Story) => (
      <div style={{ margin: "3em" }}>
        {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Testing dialog title",
    width: "640px",
    children: (
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate nihil
        odit unde doloremque cumque adipisci corporis, quibusdam suscipit.
        Obcaecati quia ipsa harum reprehenderit corrupti sapiente voluptate
        corporis recusandae quidem modi.
      </div>
    ),
    open: false,
  },
  render: (props) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
      <Fragment>
        <Button
          onClick={() => {
            setIsOpen(true);
          }}
        >
          Open dialog
        </Button>

        <Dialog
          {...{
            ...props,
            open: isOpen,
            onOk: () => {
              setIsOpen(false);
            },
            onCancel: () => {
              setIsOpen(false);
            },
          }}
        />
      </Fragment>
    );
  },
};
