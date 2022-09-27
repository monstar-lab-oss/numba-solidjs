import { Meta, Story } from "@storybook/html";
import { Icon, Props } from "./Icon";

export default {
  title: "Components/IconName",
  args: {
    children: "IconName",
  },
} as Meta;



// @ts-expect-error FIXME: Should return Solid component
const Template: Story<Props> = (args) => {
  return <Icon {...args} />;
};

export const Create = Template.bind({});
Create.args = {
  name: "create",
  size: 24,
  color: "primary",
  onClick: () => console.log("on click"),
};

export const Search = Template.bind({});
Search.args = {
  name: "search",
  size: 24,
  color: "primary",
  onClick: () => console.log("on click"),
};

export const Help = Template.bind({});
Help.args = {
  name: "help",
  size: 24,
  color: "primary",
  onClick: () => console.log("on click"),
};

export const Delete = Template.bind({});
Delete.args = {
  name: "delete",
  size: 24,
  color: "primary",
  onClick: () => console.log("on click"),
};

export const TextDelete = Template.bind({});
TextDelete.args = {
  name: "create",
  size: 24,
  color: "primary",
  onClick: () => console.log("on click"),
};
