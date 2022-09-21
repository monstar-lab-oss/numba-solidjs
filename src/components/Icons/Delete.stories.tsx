import { Meta, Story } from "@storybook/html";
import { userEvent, within } from "@storybook/testing-library";
import { Delete, Props } from "./Delete";

export default {
  title: "Components/Icons/Delete",
  args: {
    children: "Delete",
  },
} as Meta;

// @ts-expect-error FIXME: Should return Solid component
const Template: Story<Props> = (args) => <Delete {...args} />;

export const Disabled = Template.bind({});
Disabled.args = {
  size: 24,
  color: "disabled",
  onClick: () => console.log("on click"),
};

export const Primary = Template.bind({});
Primary.args = {
  size: 24,
  color: "primary",
  onClick: () => console.log("on click"),
};

export const Danger = Template.bind({});
Danger.args = {
  size: 24,
  color: "danger",
  onClick: () => console.log("on click"),
};

export const Secondary = Template.bind({});
Secondary.args = {
  size: 24,
  color: "secondary",
  onClick: () => console.log("on click"),
};

export const PrimaryOutline = Template.bind({});
PrimaryOutline.args = {
  size: 24,
  color: "primaryOutline",
  onClick: () => console.log("on click"),
};

export const DangerOutline = Template.bind({});
DangerOutline.args = {
  size: 24,
  color: "dangerOutline",
  onClick: () => console.log("on click"),
};

export const SecondaryOutline = Template.bind({});
SecondaryOutline.args = {
  size: 24,
  color: "secondaryOutline",
  onClick: () => console.log("on click"),
};

// TEST

export const IconClick = Template.bind({});

IconClick.args = {
  size: 24,
  color: "secondaryOutline",
  onClick: () => console.log("on click"),
};

IconClick.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await userEvent.click(canvas.getByRole("button"));
};
