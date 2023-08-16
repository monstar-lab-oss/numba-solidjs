import type { Meta, StoryObj } from "storybook-solidjs";
import { Text } from "./Text";

type Story = StoryObj<typeof Text>;

const meta: Meta<typeof Text> = {
  title: "Components/Text",
  component: Text,
  args: {
    children: "Hello World",
  },
};
export default meta;

export const Default: Story = {};

export const Size: Story = {
  decorators: [
    (_, { args }) => (
      <>
        <Text {...args} />
        <Text {...args} size="sizeLarge" />
        <Text {...args} size="sizeMedium" />
        <Text {...args} size="sizeSmall" />
      </>
    ),
  ],
};

export const Weight: Story = {
  decorators: [
    (_, { args }) => (
      <>
        <Text {...args} weight="weightBold" />
        <Text {...args} weight="weightMedium" />
        <Text {...args} weight="weightRegular" />
      </>
    ),
  ],
};

export const Color: Story = {
  decorators: [
    (_, { args }) => (
      <>
        <Text {...args} color="darkGray" />
        <Text {...args} color="primary" />
      </>
    ),
  ],
};
