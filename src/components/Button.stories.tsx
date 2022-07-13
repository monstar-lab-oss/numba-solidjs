import { Story, Meta } from "@storybook/html";
import { Button, Props } from "./Button";

export default {
  title: "Components/Button",
} as Meta;

// @ts-expect-error FIXME: Should return Solid component
const Template: Story<Props> = (args) => {
  return <Button title="button" />;
};

export const Primary = Template.bind({});
Primary.args = {
  title: "primary",
};

export const Secondary = Template.bind({});
Secondary.args = {
  title: "secondary",
};
