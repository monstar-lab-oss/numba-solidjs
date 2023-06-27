import type { Meta } from "storybook-solidjs";
import {
  CheckBoxColor,
  Checkbox as CheckboxComponent,
  Props,
} from "./Checkbox";

const color = ["primary", "danger", "secondary"] as CheckBoxColor[];

// NOTE: maybe it is not proper way to show list of checkbox
const TemplateList = (args: { data: Props[] }) => {
  return args.data.map((v) => (
    <>
      <CheckboxComponent {...v} />
      <br />
    </>
  ));
};

const meta = {
  component: TemplateList,
  title: "Components/Checkbox",
  args: {},
} satisfies Meta<typeof TemplateList>;
export default meta;

export const Checkbox = {
  args: {
    color: "primary",
    checked: true,
  },
};

export const Colors = {
  args: {
    // Note: outline color dose not support.
    data: color.map((color) => ({
      color,
      checked: true,
    })),
  },
};

export const Indeterminate = {
  args: {
    // Note: outline color dose not support.
    data: color.map((color) => ({
      color,
      indeterminate: true,
    })),
  },
};

export const Disabled = {
  args: {
    // Note: outline color dose not support.
    data: color.map((color) => ({
      color,
      disabled: true,
    })),
  },
};
