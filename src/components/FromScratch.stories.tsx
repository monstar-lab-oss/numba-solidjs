import { createSignal, Show } from "solid-js";
import { Portal } from "solid-js/web";
import { BadgeTable } from "@/components/BadgeTable";
import { GroupTable } from "@/components/GroupTable";
// import { useStore } from "@/lib/hooks/useStore";
import { IconButton } from "@/components/IconButton";
import { Tutorial } from "@/components/Tutorial";
import { UI_HEIGHT, UI_WIDTH } from "@/constants";
import type { UseStoreType } from "@/lib/hooks/useStore";
import type { Action } from "@/types/Actions";
import { Meta, Story } from "@storybook/html";
import { BadgePanel } from "./BadgePanel";
import { GroupPanel } from "./GroupPanel";

const styles = {
  transform: "scale(1)",
  height: UI_HEIGHT + "px",
  width: UI_WIDTH + "px",
};

export default {
  title: "Components/FromScratch",
  args: {
    children: "FromScratch",
  },
  decorators: [(storyFn) => <div style={styles}>{storyFn()}</div>],
} as Meta;

// FIXME: This code need refactor
type Props = {
  useStore: () => UseStoreType;
  badges: () => any[];
};

const dispatch = ({ type, payload }: Action) => {
  console.log("dispatch fired, ------> type: ", type, " payload : ", payload);
};

const createBadges = (howMany = 1, name = "") => {
  const res: any[] = [];

  if (howMany < 1) return [];

  for (let i = 0; i < howMany; i++) {
    // FIXME: This createSignal is not working when setSelected called.
    // const [selected, setSelected] = createSignal(false);

    res.push({
      id: "472:11218" + i,
      name: `${name}${i + 1}`,
      color: "BLUE",
      targetId: "423:12560" + i,
      // selected,
      // setSelected: a,
    });
  }

  return res;
};

const setSelectedProp = (v: any[]) => {
  v.forEach((vv) => {
    const [selected, setSelected] = createSignal(false);
    vv["selected"] = selected;
    vv["setSelected"] = setSelected;
  });
};

// @ts-expect-error FIXME: Should return Solid component
const Template: Story<Props> = (args) => {
  const [_, { enabled, groups }] = args.useStore();
  const onClick = () => dispatch({ type: "APP/CREATE_GROUP", payload: null });

  const [showTutorial, setShowTutorial] = createSignal(false);

  const tutorialOnCLose = () => {
    setShowTutorial(false);
  };

  return (
    // FIXME: 根本的にこのファイルの構成を考える必要あり/内部でhooksなど作っていて、再現するのが難しいことなどが理由
    <div
      style={{
        width: `${UI_WIDTH}px`,
        height: `${UI_HEIGHT}px`,
        "background-color": "white",
      }}
    >
      {/* FIXME: Fixed height only now */}
      <div class={`flex h-[${UI_HEIGHT}px] items-stretch`}>
        <Show when={showTutorial()}>
          <Portal>
            <Tutorial onClose={tutorialOnCLose} version={__APP_VERSION__} />
          </Portal>
        </Show>
        <GroupPanel
          createButtonDisabled={!enabled()}
          onCreateClick={onClick}
          useStore={args.useStore}
        >
          <GroupTable data={groups()} useStore={useStore} />
        </GroupPanel>

        <BadgePanel useStore={args.useStore}>
          <Show when={true}>
            <BadgeTable data={args.badges() || []} useStore={args.useStore} />
          </Show>
        </BadgePanel>
      </div>
      {/* TODO: ラップしている部分の「w-8 h-8」はIconButtonに責務を持たせる必要がある */}
      <div class="absolute bottom-0 left-0 bg-black rounded-full p-1.5 m-4 w-8 h-8">
        <IconButton
          iconName="help"
          iconColor="white"
          buttonColor="secondary"
          link
          onClick={() => setShowTutorial(true)}
        />
      </div>
    </div>
  );
};

// Default
const useStore = (): UseStoreType => {
  return [
    // @ts-expect-error FIXME: Should pass tslint.
    {},
    {
      groups: () => [],
      enabled: () => false,
      selectedGroupId: () => "472:10835",
      getBadgeByGroupId: () => [],
      // @ts-expect-error FIXME: Should pass tslint.
      setSelectedGroupId: () => console.log("setSelectedGroupId"),
      // @ts-expect-error FIXME: Should pass tslint.
      setSelectedBadgeID: () => console.log("setSelectedGroupId"),
      createGroup: () => console.log("createGroup"),
      removeGroup: () => console.log("removeGroup"),
      createBadge: () => console.log("createBadge"),
      removeBadge: () => console.log("removeBadge"),
    },
  ];
};
export const Default = Template.bind({});
Default.args = { useStore: useStore, badges: () => [] };

// CreateEnabled
const useStoreEnabled = (): UseStoreType => {
  return [
    // @ts-expect-error FIXME: Should pass tslint.
    {},
    {
      groups: () => [],
      enabled: () => true,
      selectedGroupId: () => "472:10835",
      getBadgeByGroupId: () => [],
      // @ts-expect-error FIXME: Should pass tslint.
      setSelectedGroupId: () => console.log("setSelectedGroupId"),
      // @ts-expect-error FIXME: Should pass tslint.
      setSelectedBadgeID: () => console.log("setSelectedGroupId"),
      createGroup: () => console.log("createGroup"),
      removeGroup: () => console.log("removeGroup"),
      createBadge: () => console.log("createBadge"),
      removeBadge: () => console.log("removeBadge"),
    },
  ];
};
export const CreateEnabled = Template.bind({});
CreateEnabled.args = { useStore: useStoreEnabled, badges: () => [] };

// CreateDisabled
const useStoreCreateDisabled = (): UseStoreType => {
  const [groups, setGroups] = createSignal([
    {
      id: "472:10835",
      name: "TEST FRAME",
      children: ["423:12558", "472:11220"],
    },
  ]);
  return [
    // @ts-expect-error FIXME: Should pass tslint.
    {},
    {
      groups,
      enabled: () => false,
      selectedGroupId: () => "472:10835",
      // @ts-expect-error FIXME: Should pass tslint.
      getBadgeByGroupId: () => [""],
      // @ts-expect-error FIXME: Should pass tslint.
      setSelectedGroupId: () => console.log("setSelectedGroupId"),
      // @ts-expect-error FIXME: Should pass tslint.
      setSelectedBadgeID: () => console.log("setSelectedGroupId"),
      createGroup: () => console.log("createGroup"),
      removeGroup: () => setGroups([]),
      createBadge: () => console.log("createBadge"),
      removeBadge: () => console.log("removeBadge"),
    },
  ];
};
const CreateDisabledBadges = createBadges(5);
setSelectedProp(CreateDisabledBadges);

export const CreateDisabled = Template.bind({});
CreateDisabled.args = {
  useStore: useStoreCreateDisabled,
  badges: () => CreateDisabledBadges,
};

// GroupFilled
const useStoreGroupFilled = (): UseStoreType => {
  const [groups, setGroups] = createSignal([
    {
      id: "472:10835",
      name: "TEST FRAME",
      children: ["423:12558", "472:11220"],
    },
  ]);
  return [
    // @ts-expect-error FIXME: Should pass tslint.
    {},
    {
      groups,
      enabled: () => true,
      selectedGroupId: () => "472:10835",
      getBadgeByGroupId: () => [],
      // @ts-expect-error FIXME: Should pass tslint.
      setSelectedGroupId: () => console.log("setSelectedGroupId"),
      // @ts-expect-error FIXME: Should pass tslint.
      setSelectedBadgeID: () => console.log("setSelectedGroupId"),
      createGroup: () => console.log("createGroup"),
      removeGroup: () => setGroups([]),
      createBadge: () => console.log("createBadge"),
      removeBadge: () => console.log("removeBadge"),
    },
  ];
};

export const GroupFilled = Template.bind({});

const GroupFilledBadgeList = createBadges(0);
setSelectedProp(GroupFilledBadgeList);

GroupFilled.args = {
  useStore: useStoreGroupFilled,
  badges: () => GroupFilledBadgeList,
};

// GroupFilled
const useStoreGroupAndBadgeFilled = (): UseStoreType => {
  const [groups, setGroups] = createSignal([
    {
      id: "472:10835",
      name: "TEST FRAME",
      children: ["423:12558", "472:11220"],
    },
  ]);
  return [
    // @ts-expect-error FIXME: Should pass tslint.
    {},
    {
      groups,
      enabled: () => true,
      selectedGroupId: () => "472:10835",
      // @ts-expect-error FIXME: Should pass tslint.
      getBadgeByGroupId: () => [""],
      // @ts-expect-error FIXME: Should pass tslint.
      setSelectedGroupId: () => console.log("setSelectedGroupId"),
      // @ts-expect-error FIXME: Should pass tslint.
      setSelectedBadgeID: () => console.log("setSelectedGroupId"),
      createGroup: () => console.log("createGroup"),
      removeGroup: () => setGroups([]),
      createBadge: () => console.log("createBadge"),
      removeBadge: () => console.log("removeBadge"),
    },
  ];
};

export const GroupAndBadgeFilled = Template.bind({});

const GroupAndBadgeFilledBadgeList = createBadges(5);
setSelectedProp(GroupAndBadgeFilledBadgeList);

GroupAndBadgeFilled.args = {
  useStore: useStoreGroupAndBadgeFilled,
  badges: () => GroupAndBadgeFilledBadgeList,
};

// ManyGroupAndBadges
const useStoreManyGroupAndBadges = (): UseStoreType => {
  const g: any[] = [];
  for (let i = 0; i < 100; i++) {
    g.push({
      id: "472:10835" + i,
      name: "TEST FRAME " + i,
      children: ["423:12558", "472:11220"],
    });
  }

  const [groups, setGroups] = createSignal(g);
  return [
    // @ts-expect-error FIXME: Should pass tslint.
    {},
    {
      groups,
      enabled: () => true,
      selectedGroupId: () => "472:108350",
      // @ts-expect-error FIXME: Should pass tslint.
      getBadgeByGroupId: () => [""],
      // @ts-expect-error FIXME: Should pass tslint.
      setSelectedGroupId: () => console.log("setSelectedGroupId"),
      // @ts-expect-error FIXME: Should pass tslint.
      setSelectedBadgeID: () => console.log("setSelectedGroupId"),
      createGroup: () => console.log("createGroup"),
      removeGroup: () => setGroups([]),
      createBadge: () => console.log("createBadge"),
      removeBadge: () => console.log("removeBadge"),
    },
  ];
};

export const ManyGroupAndBadges = Template.bind({});

const ManyGroupAndBadgesBadges = createBadges(999);
setSelectedProp(ManyGroupAndBadgesBadges);

ManyGroupAndBadges.args = {
  useStore: useStoreManyGroupAndBadges,
  badges: () => ManyGroupAndBadgesBadges,
};

// LongName
const useStoreLongName = (): UseStoreType => {
  const g: any[] = [];
  for (let i = 0; i < 100; i++) {
    g.push({
      id: `472:10835${i === 0 ? "" : i}`,
      name:
        "Long group name could be break layout !!!!!!!!!!!!! Long group name could be break layout !!!!!!!!!!!!! Long group name could be break layout !!!!!!!!!!!!!" +
        i,
      children: ["423:12558", "472:11220"],
    });
  }

  const [groups, setGroups] = createSignal(g);
  return [
    // @ts-expect-error FIXME: Should pass tslint.
    {},
    {
      groups,
      enabled: () => true,
      selectedGroupId: () => "472:10835",
      // @ts-expect-error FIXME: Should pass tslint.
      getBadgeByGroupId: () => [""],
      // @ts-expect-error FIXME: Should pass tslint.
      setSelectedGroupId: () => console.log("setSelectedGroupId"),
      // @ts-expect-error FIXME: Should pass tslint.
      setSelectedBadgeID: () => console.log("setSelectedGroupId"),
      createGroup: () => console.log("createGroup"),
      removeGroup: () => setGroups([]),
      createBadge: () => console.log("createBadge"),
      removeBadge: () => console.log("removeBadge"),
    },
  ];
};

export const LongName = Template.bind({});

const LongNameBadges = createBadges(
  2,
  "Long name of badge could be break layout × Long name of badge could be break layout"
);
setSelectedProp(LongNameBadges);

LongName.args = {
  useStore: useStoreLongName,
  badges: () => LongNameBadges,
};
