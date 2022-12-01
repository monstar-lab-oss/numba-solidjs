import { FONT_SIZES, FONT_WEIGHT, Props, Text } from "@/components/Text";
import { Meta, Story } from "@storybook/html";

export default {
  title: "Components/Text",
  argTypes: {
    size: {
      options: FONT_SIZES,
      control: { type: "select" },
    },
    weight: {
      options: FONT_WEIGHT,
      control: { type: "select" },
    },
  },
} as Meta;

// @ts-expect-error FIXME: Should return Solid component
const Template: Story<Props> = (args) => {
  return <Text {...args}>This is text.</Text>;
};

export const Default = Template.bind({});
Default.args = {};

export const SizeSmall = Template.bind({});
SizeSmall.args = {
  size: "sizeSmall",
};
export const SizeMedium = Template.bind({});
SizeMedium.args = {
  size: "sizeMedium",
};
export const SizeLarge = Template.bind({});
SizeLarge.args = {
  size: "sizeLarge",
};

export const WeightRegular = Template.bind({});
WeightRegular.args = {
  weight: "weightRegular",
};
export const WeightMedium = Template.bind({});
WeightMedium.args = {
  weight: "weightMedium",
};
export const WeightBold = Template.bind({});
WeightBold.args = {
  weight: "weightBold",
};
