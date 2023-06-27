import type { Meta, StoryObj } from "storybook-solidjs";
import { Icon } from "./Icon";
import { TextField } from "./TextField";

type Story = StoryObj<typeof TextField>;

const meta: Meta<typeof TextField> = {
  title: "Components/TextField",
  component: TextField,
  tags: ["autodocs"],
  args: {
    placeholder: "Placeholder",
  },
  decorators: [
    (Story, args) => {
      return (
        <div style={{ width: "240px" }}>
          <Story {...args} />
        </div>
      );
    },
  ],
};
export default meta;

export const Default: Story = {};

export const WithValue: Story = {
  args: {
    value: "あいうえおかきくけこさしすせそたちつてと",
  },
};

export const WithPrefix: Story = {
  args: {
    prefixElement: <Icon name="search" color="disabled" />,
    value: "Search",
  },
};

export const WithSuffix: Story = {
  args: {
    value: "100",
    suffixElement: "Kg",
  },
};

export const WithBoth: Story = {
  args: {
    prefixElement: <Icon name="search" color="disabled" />,
    suffixElement: <Icon name="textDelete" color="disabled" />,
    value: "Search",
  },
};
