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
  color: "primary",
};

export const Danger = Template.bind({});
Danger.args = {
  color: "danger",
};

export const Disabled = Template.bind({});
Disabled.args = {
  color: "disabled",
};

export const Secondary = Template.bind({});
Secondary.args = {
  color: "secondary",
};

export const White = Template.bind({});
White.args = {
  color: "white",
};

export const DarkGray = Template.bind({});
DarkGray.args = {
  color: "darkGray",
};

export const PrimaryOutline = Template.bind({});
PrimaryOutline.args = {
  color: "primaryOutline",
};

export const DangerOutline = Template.bind({});
DangerOutline.args = {
  color: "dangerOutline",
};

export const SecondaryOutline = Template.bind({});
SecondaryOutline.args = {
  color: "secondaryOutline",
};

export const Link = Template.bind({});
Link.args = {
  link: true,
};
