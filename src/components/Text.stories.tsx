import type { Meta, StoryObj } from "storybook-solidjs";
import { FONT_COLOR, FONT_SIZES, FONT_WEIGHT, Text } from "@/components/Text";

type Story = StoryObj<typeof Text>;

const meta: Meta<typeof Text> = {
  title: "Components/Text",
  component: Text,
  tags: ["autodocs"],
  args: {
    children: "This is text.",
  },
  argTypes: {
    size: {
      options: FONT_SIZES,
      control: { type: "select" },
    },
    weight: {
      options: FONT_WEIGHT,
      control: { type: "select" },
    },
    color: {
      options: FONT_COLOR,
      control: { type: "select" },
    },
  },
};
export default meta;

export const Default: Story = {
  args: {},
};

export const SizeSmall: Story = {
  args: {
    size: "sizeSmall",
  },
};

export const SizeMedium: Story = {
  args: {
    size: "sizeMedium",
  },
};

export const SizeLarge: Story = {
  args: {
    size: "sizeLarge",
  },
};

export const WeightRegular: Story = {
  args: {
    weight: "weightRegular",
  },
};

export const WeightMedium: Story = {
  args: {
    weight: "weightMedium",
  },
};

export const WeightBold: Story = {
  args: {
    weight: "weightBold",
  },
};

//FIXME: remove this story because it is duplicated
export const TextDefault: Story = {
  args: {},
};

export const TextDarkGray: Story = {
  args: {
    color: "darkGray",
  },
};
