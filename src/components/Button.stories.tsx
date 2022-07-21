import { Story, Meta } from "@storybook/html";
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

export const Defalt = Template.bind({});
Defalt.args = {};

export const Primary = Template.bind({});
Primary.args = {
  use: "primary",
};

export const Danger = Template.bind({});
Danger.args = {
  use: "danger",
};
