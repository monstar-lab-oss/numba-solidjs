import type { Meta, StoryObj } from "storybook-solidjs";
import { Icon } from "./Icon";

type Story = StoryObj<typeof Icon>;

const meta: Meta<typeof Icon> = {
  title: "Components/Icon",
  component: Icon,
  args: {
    name: "delete",
  },
};

export default meta;

export const Default: Story = {};

export const Name: Story = {
  decorators: [
    (_, { args }) => (
      <>
        <Icon {...args} name="arrowLeft" />
        <Icon {...args} name="arrowLeftNUMBA" />
        <Icon {...args} name="arrowRight" />
        <Icon {...args} name="create" />
        <Icon {...args} name="delete" />
        <Icon {...args} name="help" />
        <Icon {...args} name="search" />
        <Icon {...args} name="textDelete" />
      </>
    ),
  ],
};

export const Color: Story = {
  decorators: [
    (_, { args }) => (
      <>
        <Icon {...args} />
        <Icon {...args} color="danger" />
        <Icon {...args} color="dangerOutline" />
        <Icon {...args} color="darkGray" />
        <Icon {...args} color="disabled" />
        <Icon {...args} color="primary" />
        <Icon {...args} color="primaryOutline" />
        <Icon {...args} color="secondary" />
        <Icon {...args} color="secondaryOutline" />
        <Icon {...args} color="white" />
      </>
    ),
  ],
};

export const Size: Story = {
  decorators: [
    (_, { args }) => (
      <>
        <Icon {...args} />
        <Icon {...args} size={40} />
        <Icon {...args} size={60} />
        <Icon {...args} size={80} />
        <Icon {...args} size={100} />
      </>
    ),
  ],
};
