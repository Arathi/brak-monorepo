import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { StudentIcon } from "../src/components/StudentIcon";

const meta = {
  title: "Student/StudentIcon",
  component: StudentIcon,
  tags: ["autodocs"],
  argTypes: {
    id: {
      control: "number",
    },
    student: {
      control: "object",
    },
    name: {
      control: "text",
    },
    school: {
      control: "select",
      options: [
        "Gehenna",
        "Millennium",
        "Trinity",
        "Abydos",
        "Shanhaijing",
        "Hyakkiyako",
        "RedWinter",
        "SRT",
        "Arius",
        "Tokiwadai",
        "Valkyrie",
        "ETC",
      ],
    },
    squad: {
      control: "select",
      options: ["Main", "Support"],
    },
    role: {
      control: "select",
      options: ["DamageDealer", "Tanker", "Supporter", "Healer", "Vehicle"],
    },
    attackType: {
      control: "select",
      options: ["Explosion", "Mystic", "Pierce", "Sonic"],
    },
    armorType: {
      control: "select",
      options: ["LightArmor", "HeavyArmor", "Unarmed", "ElasticArmor"],
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
    id: 10000,
  },
};
