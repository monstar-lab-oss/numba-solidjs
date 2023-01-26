import page1 from "@/asset/tutorial/page-1.png";
import page2 from "@/asset/tutorial/page-2.png";
import page3 from "@/asset/tutorial/page-3.png";
import page4 from "@/asset/tutorial/page-4.png";
import { Carousel, Props } from "@/components/Carousel";
// import { UI_WIDTH, UI_HEIGHT } from "@/constants";
import { Text } from "@/components/Text";
import { Meta, Story } from "@storybook/html";

export default {
  title: "Components/Carousel",
  args: {
    placeholder: "Placeholder",
  },
} as Meta;

const contents = [
  {
    src: page1,
    body: (
      <>
        <Text class="text-center">
          Select the group you want to assign numbers
        </Text>
        <Text class="text-center"> and click "Create" button.</Text>
      </>
    ),
  },
  {
    src: page2,
    body: (
      <>
        <Text class="text-center">To start assigning numbers,</Text>
        <Text class="text-center">click the object on the canvas.</Text>
        <Text size="sizeSmall" color="darkGray" class="text-center">
          ※ The number is available up to 999.
        </Text>
      </>
    ),
  },
  {
    src: page3,
    body: (
      <Text class="text-center">
        To check the assigned numbers, select a group
      </Text>
    ),
  },
  {
    src: page4,
    body: (
      <>
        <Text class="text-center">
          Click on the 🗑 to delete the numbers from the
        </Text>
        <Text class="text-center">selected group.</Text>
      </>
    ),
  },
];

// @ts-expect-error FIXME: Should return Solid component
const Template: Story<Props> = (args) => {
  return (
    // NOTE: import { UI_WIDTH, UI_HEIGHT } from "@/constants";
    <div class={`bg-white w-[480px] h-[392px]`}>
      <Carousel {...args} />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  onClose: () => console.log("onclose"),
  contents: contents,
};
