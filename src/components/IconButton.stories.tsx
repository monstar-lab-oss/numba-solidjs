import type { Meta, StoryObj } from "storybook-solidjs";
import { IconButton } from "./IconButton";

type Story = StoryObj<typeof IconButton>;

const meta: Meta<typeof IconButton> = {
  title: "Components/IconButton",
  component: IconButton,
  args: {
    iconName: "delete",
  },
};
export default meta;

export const Default: Story = {};

export const Children: Story = {
  args: {
    children: "Click me!",
  },
};

export const ButtonColor: Story = {
  decorators: [
    (_, { args }) => (
      <>
        <IconButton {...args} />
        <IconButton {...args} buttonColor="danger" />
        <IconButton {...args} buttonColor="dangerOutline" />
        <IconButton {...args} buttonColor="darkGray" />
        <IconButton {...args} buttonColor="disabled" />
        <IconButton {...args} buttonColor="primary" />
        <IconButton {...args} buttonColor="primaryOutline" />
        <IconButton {...args} buttonColor="secondary" iconColor="white" />
        <IconButton {...args} buttonColor="secondaryOutline" />
        <IconButton {...args} buttonColor="white" />
      </>
    ),
  ],
};

export const IconColor: Story = {
  decorators: [
    (_, { args }) => (
      <>
        <IconButton {...args} />
        <IconButton {...args} iconColor="danger" />
        <IconButton {...args} iconColor="dangerOutline" />
        <IconButton {...args} iconColor="darkGray" />
        <IconButton {...args} iconColor="disabled" />
        <IconButton {...args} iconColor="primary" />
        <IconButton {...args} iconColor="primaryOutline" />
        <IconButton {...args} iconColor="secondary" />
        <IconButton {...args} iconColor="secondaryOutline" />
        <IconButton {...args} iconColor="white" />
      </>
    ),
  ],
};

export const IconName: Story = {
  decorators: [
    (_, { args }) => (
      <>
        <IconButton {...args} iconName="arrowLeft" />
        <IconButton {...args} iconName="arrowLeftNUMBA" />
        <IconButton {...args} iconName="arrowRight" />
        <IconButton {...args} iconName="create" />
        <IconButton {...args} iconName="delete" />
        <IconButton {...args} iconName="help" />
        <IconButton {...args} iconName="search" />
        <IconButton {...args} iconName="textDelete" />
      </>
    ),
  ],
};

export const IconDisabledColor: Story = {
  decorators: [
    (_, { args }) => (
      <>
        <IconButton {...args} disabled />
        <IconButton {...args} disabled iconDisabledColor="danger" />
        <IconButton {...args} disabled iconDisabledColor="dangerOutline" />
        <IconButton {...args} disabled iconDisabledColor="darkGray" />
        <IconButton {...args} disabled iconDisabledColor="disabled" />
        <IconButton {...args} disabled iconDisabledColor="primary" />
        <IconButton {...args} disabled iconDisabledColor="primaryOutline" />
        <IconButton {...args} disabled iconDisabledColor="secondary" />
        <IconButton {...args} disabled iconDisabledColor="secondaryOutline" />
        <IconButton {...args} disabled iconDisabledColor="white" />
      </>
    ),
  ],
};

export const IconSize: Story = {
  decorators: [
    (_, { args }) => (
      <>
        <IconButton {...args} />
        <IconButton {...args} iconSize={40} />
        <IconButton {...args} iconSize={60} />
        <IconButton {...args} iconSize={80} />
        <IconButton {...args} iconSize={100} />
      </>
    ),
  ],
};
