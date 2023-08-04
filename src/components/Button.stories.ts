import type { Meta, StoryObj } from "storybook-solidjs";
import { Button } from "./Button";

type Story = StoryObj<typeof Button>;

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  args: {
    children: "Button-test2",
  },
};

export const Default: Story = {};

export const Primary = {
  args: {
    color: "primary",
  },
};

export const Danger = {
  args: {
    color: "danger",
  },
};

export const Disabled = {
  args: {
    color: "disabled",
  },
};

export const Secondary = {
  args: {
    color: "secondary",
  },
};

export const White = {
  args: {
    color: "white",
  },
};

export const DarkGray = {
  args: {
    color: "darkGray",
  },
};

export const PrimaryOutline = {
  args: {
    color: "primaryOutline",
  },
};

export const DangerOutline = {
  args: {
    color: "dangerOutline",
  },
};

export const SecondaryOutline = {
  args: {
    color: "secondaryOutline",
  },
};

export const Link = {
  args: {
    link: true,
  },
};

export default meta;
