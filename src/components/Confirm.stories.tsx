import { Story, Meta } from "@storybook/html";
import { Confirm, Props } from "./Confirm";

export default {
  title: "Components/Confirm",
  args: {
    children: "Confirm",
  },
} as Meta;

// @ts-expect-error FIXME: Should return Solid component
const Template: Story<Props> = (args) => <Confirm {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  options: {
    onConfirm: () => null,
    onClose: () => null,
    show: true,
    body: "Confirm component",
    confirmButtonColor: "primary",
    confirmButtonText: "Primary",
    cancelButtonText: "Cancel",
  },
};

export const Danger = Template.bind({});
Danger.args = {
  options: {
    onConfirm: () => console.log("OnConfirm fired !"),
    onClose: () => console.log("OnClose fired !"),
    show: true,
    body: "Confirm component",
    confirmButtonColor: "danger",
    confirmButtonText: "Danger",
    cancelButtonText: "Cancel",
  },
};

export const Disabled = Template.bind({});
Disabled.args = {
  options: {
    onConfirm: () => console.log("OnConfirm fired !"),
    onClose: () => console.log("OnClose fired !"),
    show: true,
    body: "Confirm component",
    confirmButtonColor: "disabled",
    confirmButtonText: "Disabled",
    cancelButtonText: "Cancel",
  },
};

export const Secondary = Template.bind({});
Secondary.args = {
  options: {
    onConfirm: () => console.log("OnConfirm fired !"),
    onClose: () => console.log("OnClose fired !"),
    show: true,
    body: "Confirm component",
    confirmButtonColor: "secondary",
    confirmButtonText: "Secondary",
    cancelButtonText: "Cancel",
  },
};

export const PrimaryOutline = Template.bind({});
PrimaryOutline.args = {
  options: {
    onConfirm: () => console.log("OnConfirm fired !"),
    onClose: () => console.log("OnClose fired !"),
    show: true,
    body: "Confirm component",
    confirmButtonColor: "primaryOutline",
    confirmButtonText: "Primary Outline",
    cancelButtonText: "Cancel",
  },
};

export const DangerOutline = Template.bind({});
DangerOutline.args = {
  options: {
    onConfirm: () => console.log("OnConfirm fired !"),
    onClose: () => console.log("OnClose fired !"),
    show: true,
    body: "Confirm component",
    confirmButtonColor: "dangerOutline",
    confirmButtonText: "Danger Outline",
    cancelButtonText: "Cancel",
  },
};

export const SecondaryOutline = Template.bind({});
SecondaryOutline.args = {
  options: {
    onConfirm: () => console.log("OnConfirm fired !"),
    onClose: () => console.log("OnClose fired !"),
    show: true,
    body: "Confirm component",
    confirmButtonColor: "secondaryOutline",
    confirmButtonText: "Secondary Outline",
    cancelButtonText: "Cancel",
  },
};
