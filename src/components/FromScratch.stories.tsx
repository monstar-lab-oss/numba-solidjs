import { Story, Meta } from "@storybook/html";
import { FromScratch } from "./FromScratch";

export default {
  title: "Components/FromScratch",
} as Meta;

// @ts-expect-error FIXME: Should return Solid component
const Template: Story<{}> = () => {
  return <FromScratch />;
};

export const Default = Template.bind({});
Default.args = {};
