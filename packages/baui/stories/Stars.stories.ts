import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Stars } from "../src/components/StudentIcon/Stars";

const meta = {
  title: "Common/Stars",
  component: Stars,
  tags: ["autodocs"],
  argTypes: {
    rank: {
      control: "number",
    },
    weapon: {
      control: "number",
    },
    gap: {
      control: "number",
    },
    scale: {
      control: "number",
    },
    hideGolden: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Stars>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const RankOnly: Story = {
  args: {
    rank: 3,
  },
};

export const WeaponRankOnly: Story = {
  args: {
    weapon: 2,
    hideGolden: true,
  },
};

export const Both: Story = {
  args: {
    rank: 5,
    weapon: 1,
    hideGolden: false,
  },
};

export const Full: Story = {
  args: {
    rank: 5,
    weapon: 3,
    hideGolden: false,
  },
};

export const Compact: Story = {
  args: {
    rank: 5,
    weapon: 2,
    gap: -12,
    hideGolden: false,
  },
};
