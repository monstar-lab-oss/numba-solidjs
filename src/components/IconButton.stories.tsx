import { Meta, Story } from "@storybook/html";
import { COLOR } from "./constants";
import { ICON_NAMES } from "./Icon";
import { IconButton as IconButtonComponent, Props } from "./IconButton";

export default {
  title: "Components/IconButton",
  args: {
    children: "IconButton",
  },
  argTypes: {
    name: {
      options: ICON_NAMES,
      control: { type: "select" },
      defaultValue: "create",
    },
    color: {
      options: COLOR,
      control: { type: "select" },
      defaultValue: "primary",
    },
  },
} as Meta;

// @ts-expect-error FIXME: Should return Solid component
const Template: Story<Props> = (args) => <IconButtonComponent {...args} />;

export const Default = Template.bind({});
Default.args = {
  iconName: "create",
  iconColor: "primary",
  children: undefined,
};

export const Link = Template.bind({});
Link.args = {
  iconName: "create",
  iconColor: "primary",
  link: true,
  children: undefined,
};

export const Disabled = Template.bind({});
Disabled.args = {
  iconName: "create",
  iconColor: "primary",
  link: true,
  disabled: true,
  buttonColor: "white",
  children: undefined,
};

export const WithText = Template.bind({});
WithText.args = {
  iconName: "create",
  iconColor: "primary",
  children: "With text",
};

// FIXME For now chromatic dose not support for lazy load components test.
// export const IconClick = Template.bind({});

// IconClick.args = baseData;
// IconClick.play = async ({ canvasElement }) => {
//   const canvas = within(canvasElement);
//   // FIXME: WorkAround wait for component until rendered.
//   await sleep(5000);
//   await userEvent.click(canvas.getByRole("button"));
// };
