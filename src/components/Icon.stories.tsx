import { Meta, Story } from "@storybook/html";
import { COLOR } from "../types/Colors";
import { Icon as IconComponent, ICON_NAMES, Props } from "./Icon";

export default {
  title: "Components/IconName",
  args: {
    children: "IconName",
  },
  argTypes: {
    color: {
      options: COLOR,
      control: { type: "select" },
    },
    name: {
      options: ICON_NAMES,
      control: { type: "select" },
    },
  },
} as Meta;

// @ts-expect-error FIXME: Should return Solid component
const Template: Story<{ data: Props }> = (args) => <IconComponent {...args} />;

// @ts-expect-error FIXME: Should return Solid component
const TemplateList: Story<{ data: Props[] }> = (args) => {
  return args.data.map((v) => (
    <>
      <IconComponent {...v} />
      <br />
    </>
  ));
};

const baseData: Props = {
  name: "create",
  size: 24,
  color: "primary",
  onClick: () => console.log("on click"),
};

export const Icon = Template.bind({});
Icon.args;

export const Icons = TemplateList.bind({});
Icons.args = {
  data: ICON_NAMES.map((name) => ({
    ...baseData,
    name,
  })),
};

export const Colors = TemplateList.bind({});
Colors.args = {
  data: COLOR.map((color) => ({
    ...baseData,
    color,
  })),
};
