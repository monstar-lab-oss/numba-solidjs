import { Meta, Story } from "@storybook/html";
import { Icon } from "./Icon";
import { Props, TextField } from "./TextField";

export default {
  title: "Components/TextField",
  args: {
    placeholder: "Placeholder",
  },
} as Meta;

// @ts-expect-error FIXME: Should return Solid component
const Template: Story<Props> = (args) => {
  return (
    <div style={{ width: "240px" }}>
      <TextField {...args} />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {};

export const WithValue = Template.bind({});
WithValue.args = {
  value: "あいうえおかきくけこさしすせそたちつてと",
};

export const WithPrefix = Template.bind({});
WithPrefix.args = {
  prefixElement: <Icon name="search" color="disabled" />,
  value: "Search",
};

export const WithSuffix = Template.bind({});
WithSuffix.args = {
  value: "100",
  suffixElement: "Kg",
};

export const WithBoth = Template.bind({});
WithBoth.args = {
  prefixElement: <Icon name="search" color="disabled" />,
  suffixElement: <Icon name="textDelete" color="disabled" />,
  value: "Search",
};
