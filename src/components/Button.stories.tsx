import { Meta, Story } from "@storybook/html";
import { Button, Props } from "./Button";

export default {
  title: "Components/Button",
  args: {
    children: "Button",
  },
} as Meta;

// @ts-expect-error FIXME: Should return Solid component
const Template: Story<Props> = (args) => {
  return <Button {...args}>{args.children}</Button>;
};

export const Default = Template.bind({});
Default.args = {};

export const Primary = Template.bind({});
Primary.args = {
  use: "primary",
};

export const Danger = Template.bind({});
Danger.args = {
  use: "danger",
};

export const Disabled = Template.bind({});
Disabled.args = {
  use: "disabled",
};

export const Secondary = Template.bind({});
Secondary.args = {
  use: "secondary",
};

export const PrimaryOutline = Template.bind({});
PrimaryOutline.args = {
  use: "primaryOutline",
};

export const DangerOutline = Template.bind({});
DangerOutline.args = {
  use: "dangerOutline",
};

export const SecondaryOutline = Template.bind({});
SecondaryOutline.args = {
  use: "secondaryOutline",
};

export const Link = Template.bind({});
Link.args = {
  use: "primary",
  link: true,
};
