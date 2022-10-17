import { Meta, Story } from "@storybook/html";
import { Checkbox, Props } from "./Checkbox";

export default {
  title: "Components/Checkbox",
  args: {
    children: "Checkbox",
  },
} as Meta;

// @ts-expect-error FIXME: Should return Solid component
const Template: Story<Props> = (args) => {
  return <Checkbox {...args} />;
};

export const Default = Template.bind({});
Default.args = {};

export const Primary = Template.bind({});
Primary.args = {
  color: "primary",
  indeterminate: true,
};
