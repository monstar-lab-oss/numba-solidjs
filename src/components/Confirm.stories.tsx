import { Story, Meta } from "@storybook/html";
import { Confirm, Props } from "./Confirm";
import { within, userEvent } from "@storybook/testing-library";

export default {
  title: "Components/Confirm",
  args: {
    children: "Confirm",
  },
} as Meta;

// @ts-expect-error FIXME: Should return Solid component
const Template: Story<Props> = (args) => <Confirm {...args} />;

export const Default = Template.bind({});
Default.args = {
  onConfirm: () => console.log("onConfirm"),
  onClose: () => console.log("onClose"),
  body: "Confirm component",
  confirmButtonColor: "primary",
  confirmButtonText: "Default(Primary)",
  cancelButtonText: "Cancel",
};

export const ConfirmHidden = Template.bind({});
ConfirmHidden.args = {
  onConfirm: () => console.log("onConfirm"),
  onClose: () => console.log("onClose"),
  body: "Confirm component",
  confirmButtonColor: "primary",
  confirmButtonText: "Confirm Hidden",
  cancelButtonText: "Cancel",
};

export const Danger = Template.bind({});
Danger.args = {
  onConfirm: () => console.log("OnConfirm fired !"),
  onClose: () => console.log("OnClose fired !"),
  body: "Confirm component",
  confirmButtonColor: "danger",
  confirmButtonText: "Danger",
  cancelButtonText: "Cancel",
};

export const Disabled = Template.bind({});
Disabled.args = {
  onConfirm: () => console.log("OnConfirm fired !"),
  onClose: () => console.log("OnClose fired !"),
  body: "Confirm component",
  confirmButtonColor: "disabled",
  confirmButtonText: "Disabled",
  cancelButtonText: "Cancel",
};

export const Secondary = Template.bind({});
Secondary.args = {
  onConfirm: () => console.log("OnConfirm fired !"),
  onClose: () => console.log("OnClose fired !"),
  body: "Confirm component",
  confirmButtonColor: "secondary",
  confirmButtonText: "Secondary",
  cancelButtonText: "Cancel",
};

export const PrimaryOutline = Template.bind({});
PrimaryOutline.args = {
  onConfirm: () => console.log("OnConfirm fired !"),
  onClose: () => console.log("OnClose fired !"),
  body: "Confirm component",
  confirmButtonColor: "primaryOutline",
  confirmButtonText: "Primary Outline",
  cancelButtonText: "Cancel",
};

export const DangerOutline = Template.bind({});
DangerOutline.args = {
  onConfirm: () => console.log("OnConfirm fired !"),
  onClose: () => console.log("OnClose fired !"),
  body: "Confirm component",
  confirmButtonColor: "dangerOutline",
  confirmButtonText: "Danger Outline",
  cancelButtonText: "Cancel",
};

export const SecondaryOutline = Template.bind({});
SecondaryOutline.args = {
  onConfirm: () => console.log("OnConfirm fired !"),
  onClose: () => console.log("OnClose fired !"),
  body: "Confirm component",
  confirmButtonColor: "secondaryOutline",
  confirmButtonText: "Secondary Outline",
  cancelButtonText: "Cancel",
};

// TEST

export const ConfirmClick = Template.bind({});

ConfirmClick.args = {
  onConfirm: () => console.log("OnConfirm fired !"),
  onClose: () => console.log("OnClose fired !"),
  body: "Confirm component",
  confirmButtonColor: "secondaryOutline",
  confirmButtonText: "Confirm",
  cancelButtonText: "Cancel",
};

ConfirmClick.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await userEvent.click(canvas.getByRole("button", { name: "Confirm" }));
};

export const ConfirmCancel = Template.bind({});

ConfirmCancel.args = {
  onConfirm: () => console.log("OnConfirm fired !"),
  onClose: () => console.log("OnClose fired !"),
  body: "Confirm component",
  confirmButtonColor: "secondaryOutline",
  confirmButtonText: "Confirm",
  cancelButtonText: "Cancel",
};

ConfirmCancel.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await userEvent.click(canvas.getByRole("button", { name: "Cancel" }));
};
