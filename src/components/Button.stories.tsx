import type { Meta } from "storybook-solidjs";
import { Button } from "./Button";

const meta = {
  component: Button,
  title: "Components/Button",
  args: {
    children: "Button",
  },
} satisfies Meta<typeof Button>;
export default meta;

export const Default = {
  args: {},
};

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
