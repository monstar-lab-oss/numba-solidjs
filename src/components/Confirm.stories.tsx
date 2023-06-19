import { userEvent, within } from "@storybook/testing-library";
import type { Meta, StoryObj } from "storybook-solidjs";
import { Confirm } from "./Confirm";

type Story = StoryObj<typeof Confirm>;

const meta = {
  component: Confirm,
  title: "Components/Confirm",
  args: {
    children: "Confirm",
  },
} satisfies Meta<typeof Confirm>;
export default meta;

export const Default: Story = {
  args: {
    onConfirm: () => console.log("onConfirm"),
    onClose: () => console.log("onClose"),
    body: "Confirm component",
    confirmButtonColor: "primary",
    confirmButtonText: "Default(Primary)",
    cancelButtonText: "Cancel",
  },
};

export const ConfirmHidden: Story = {
  args: {
    onConfirm: () => console.log("onConfirm"),
    onClose: () => console.log("onClose"),
    body: "Confirm component",
    confirmButtonColor: "primary",
    confirmButtonText: "Confirm Hidden",
    cancelButtonText: "Cancel",
  },
};

export const Danger: Story = {
  args: {
    onConfirm: () => console.log("OnConfirm fired !"),
    onClose: () => console.log("OnClose fired !"),
    body: "Confirm component",
    confirmButtonColor: "danger",
    confirmButtonText: "Danger",
    cancelButtonText: "Cancel",
  },
};

export const Disabled: Story = {
  args: {
    onConfirm: () => console.log("OnConfirm fired !"),
    onClose: () => console.log("OnClose fired !"),
    body: "Confirm component",
    confirmButtonColor: "disabled",
    confirmButtonText: "Disabled",
    cancelButtonText: "Cancel",
  },
};

export const Secondary: Story = {
  args: {
    onConfirm: () => console.log("OnConfirm fired !"),
    onClose: () => console.log("OnClose fired !"),
    body: "Confirm component",
    confirmButtonColor: "secondary",
    confirmButtonText: "Secondary",
    cancelButtonText: "Cancel",
  },
};

export const White: Story = {
  args: {
    onConfirm: () => console.log("OnConfirm fired !"),
    onClose: () => console.log("OnClose fired !"),
    body: "Confirm component",
    confirmButtonColor: "white",
    confirmButtonText: "White",
    cancelButtonText: "Cancel",
  },
};

export const PrimaryOutline: Story = {
  args: {
    onConfirm: () => console.log("OnConfirm fired !"),
    onClose: () => console.log("OnClose fired !"),
    body: "Confirm component",
    confirmButtonColor: "primaryOutline",
    confirmButtonText: "Primary Outline",
    cancelButtonText: "Cancel",
  },
};

export const DangerOutline: Story = {
  args: {
    onConfirm: () => console.log("OnConfirm fired !"),
    onClose: () => console.log("OnClose fired !"),
    body: "Confirm component",
    confirmButtonColor: "dangerOutline",
    confirmButtonText: "Danger Outline",
    cancelButtonText: "Cancel",
  },
};

export const SecondaryOutline: Story = {
  args: {
    onConfirm: () => console.log("OnConfirm fired !"),
    onClose: () => console.log("OnClose fired !"),
    body: "Confirm component",
    confirmButtonColor: "secondaryOutline",
    confirmButtonText: "Secondary Outline",
    cancelButtonText: "Cancel",
  },
};

// TEST
export const ConfirmClick: Story = {
  args: {
    onConfirm: () => console.log("OnConfirm fired !"),
    onClose: () => console.log("OnClose fired !"),
    body: "Confirm component",
    confirmButtonColor: "secondaryOutline",
    confirmButtonText: "Confirm",
    cancelButtonText: "Cancel",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Confirm" }));
  },
};

export const ConfirmCancel: Story = {
  args: {
    onConfirm: () => console.log("OnConfirm fired !"),
    onClose: () => console.log("OnClose fired !"),
    body: "Confirm component",
    confirmButtonColor: "secondaryOutline",
    confirmButtonText: "Confirm",
    cancelButtonText: "Cancel",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Cancel" }));
  },
};
