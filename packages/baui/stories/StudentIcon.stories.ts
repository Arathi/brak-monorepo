import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { StudentIcon } from "../src/components/StudentIcon";

const meta = {
  title: "Student/StudentIcon",
  component: StudentIcon,
  tags: ["autodocs"],
  argTypes: {
    metadata: {
      control: "number",
    },
    name: {
      control: "text",
    },
  },
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof StudentIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    metadata: 10000,
  },
};
