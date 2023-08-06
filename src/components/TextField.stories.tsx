import type { Meta, StoryObj } from "storybook-solidjs";
import { Icon } from "./Icon";
import { TextField } from "./TextField";

type Story = StoryObj<typeof TextField>;

const meta: Meta<typeof TextField> = {
  title: "Components/TextField",
  component: TextField,
  args: {
    value: "Hello world",
  },
  decorators: [
    (Story) => (
      <div style={{ width: "250px" }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;

export const Default: Story = {
  args: {},
};

export const ValueLongText: Story = {
  args: {
    value: "lorem ipsum dolor sit amet ".repeat(10),
  },
};

export const PrefixElement: Story = {
  args: {
    prefixElement: <span>$</span>,
    value: "100",
  },
};

export const SuffixElement: Story = {
  args: {
    suffixElement: <Icon name="textDelete" color="darkGray" />,
  },
};
