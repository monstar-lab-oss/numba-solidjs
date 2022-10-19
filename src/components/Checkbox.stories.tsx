import { Meta, Story } from "@storybook/html";
import {
  Checkbox as CheckboxComponent,
  CheckBoxColor,
  Props,
} from "./Checkbox";

// import { COLOR } from "./constants";

const color = ["primary", "danger", "secondary"] as CheckBoxColor[];

export default {
  title: "Components/Checkbox",
  args: {
    children: "Checkbox",
  },
  argTypes: {
    color: {
      options: color,
      control: { type: "select" },
      defaultValue: "primary",
    },
  },
} as Meta;

// @ts-expect-error FIXME: Should return Solid component
const TemplateList: Story<{ data: Props[] }> = (args) => {
  return args.data.map((v) => (
    <>
      <CheckboxComponent {...v} />
      <br />
    </>
  ));
};

// @ts-expect-error FIXME: Should return Solid component
const Template: Story<Props> = (args) => <CheckboxComponent {...args} />;

export const Checkbox = Template.bind({});
Checkbox.args = {
  color: "primary",
  checked: true,
};

export const Colors = TemplateList.bind({});
Colors.args = {
  // Note: outline color dose not support.
  data: color.map((color) => ({
    color,
    checked: true,
  })),
};

export const Indeterminate = TemplateList.bind({});
Indeterminate.args = {
  // Note: outline color dose not support.
  data: color.map((color) => ({
    color,
    indeterminate: true,
  })),
};

export const Disabled = TemplateList.bind({});
Disabled.args = {
  // Note: outline color dose not support.
  data: color.map((color) => ({
    color,
    disabled: true,
  })),
};
