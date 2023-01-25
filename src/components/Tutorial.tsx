import { Component } from "solid-js";
import page1 from "@/asset/tutorial/page-1.png";
import page2 from "@/asset/tutorial/page-2.png";
import page3 from "@/asset/tutorial/page-3.png";
import page4 from "@/asset/tutorial/page-4.png";
import type { Content } from "@/components/Carousel";
import { Carousel } from "@/components/Carousel";
import { Modal } from "@/components/Modal";
import { Text } from "@/components/Text";


export type Props = {
  onClose: () => void;
};

export const Tutorial: Component<Props> = (props) => {
  const contents: Content[] = [
    {
      src: page1,
      body: (
        <>
          <Text size="sizeMedium" class="text-center">
            Select the group you want to assign numbers
          </Text>
          <Text size="sizeMedium" class="text-center">
            and click "Create" button.
          </Text>
        </>
      ),
    },
    {
      src: page2,
      body: (
        <>
          <Text size="sizeMedium" class="text-center">
            To start assigning numbers,
          </Text>
          <Text size="sizeMedium" class="text-center">
            click the object on the canvas.
          </Text>
          <Text size="sizeSmall" color="darkGray" class="text-center">
            ※ The number is available up to 999.
          </Text>
        </>
      ),
    },
    {
      src: page3,
      body: (
        <Text size="sizeMedium" class="text-center">
          To check the assigned numbers, select a group
        </Text>
      ),
    },
    {
      src: page4,
      body: (
        <>
          <Text size="sizeMedium" class="text-center">
            Click on the 🗑 to delete the numbers from the
          </Text>
          <Text size="sizeMedium" class="text-center">
            selected group.
          </Text>
        </>
      ),
    },
  ];

  return (
    <Modal bgColor="white">
      <Carousel contents={contents} onClose={props.onClose} />
    </Modal>
  );
};
