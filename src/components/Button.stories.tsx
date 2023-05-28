import type { Meta, StoryObj } from "storybook-solidjs";
import { Button } from "./Button";

const meta = {
  title: "Components/Button",
  component: Button,
  args: {
    children: "Button",
    color: undefined,
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Primary: Story = {
  args: {
    color: "primary",
  },
};

export const Danger: Story = {
  args: {
    color: "danger",
  },
};

export const Disabled: Story = {
  args: {
    color: "disabled",
  },
};

export const Secondary: Story = {
  args: {
    color: "secondary",
  },
};

export const White: Story = {
  args: {
    color: "white",
  },
};

export const DarkGray: Story = {
  args: {
    color: "darkGray",
  },
};

export const PrimaryOutline: Story = {
  args: {
    color: "primaryOutline",
  },
};

export const DangerOutline: Story = {
  args: {
    color: "dangerOutline",
  },
};

export const SecondaryOutline: Story = {
  args: {
    color: "secondaryOutline",
  },
};

export const Link: Story = {
  args: {
    link: true,
  },
};
