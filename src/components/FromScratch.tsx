import { For, Component, children, JSX } from "solid-js";

export type Props = {};

type C = Component<{ children: JSX.Element }>;

// test data
const SCENE_ITEMS = [...new Array(100)].map((_, i) => ({
  id: `id_${i + 1}`,
  name: `name_${i + 1}`,
}));

const NUMBER_ITEMS = [...new Array(100)].map((_, i) => ({
  id: `id_${i + 1}`,
  name: `${i + 1}`,
}));

// components
const CreateButton = () => (
  <button class="flex items-center rounded-lg bg-blue-100 py-2 px-4 text-sm font-semibold text-blue-400">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="mr-1 h-4 w-4"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fill-rule="evenodd"
        d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
        clip-rule="evenodd"
      />
    </svg>
    Create
  </button>
);

const RemoveButton = () => (
  <button class="flex items-center rounded-lg bg-red-100 py-2 px-4 text-sm font-semibold text-red-400">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="mr-1 h-4 w-4"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fill-rule="evenodd"
        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
        clip-rule="evenodd"
      />
    </svg>
    Remove
  </button>
);

const SearchForm = () => {
  return (
    <form class="mt-4 flex items-center">
      <label for="voice-search" class="sr-only">
        Search
      </label>
      <div class="relative w-full">
        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <svg
            class="h-5 w-5 text-gray-500 dark:text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <input
          type="text"
          id="search"
          class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-400 focus:ring-blue-400 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="Search"
          required
        />
      </div>
    </form>
  );
};

// table components
type Item = { id: string; name: string };

type TableProps = {
  hasCheckbox?: boolean;
  items: Item[];
};
const Table: Component<TableProps> = (props) => (
  <table class="w-full table-auto scroll-auto">
    <TableHeader headers={[]} />
    <TableBody items={props.items} hasCheckbox={props.hasCheckbox} />
  </table>
);

type TableHeaderProps = { headers: string[] };
const TableHeader: Component<TableHeaderProps> = (props) => (
  <thead class="bg-gray-50 text-xs font-semibold uppercase text-gray-400">
    <tr>
      <th />
      <For each={props.headers}>
        {(name) => (
          <th class="p-2">
            <div class="text-left font-semibold">{name}</div>
          </th>
        )}
      </For>
    </tr>
  </thead>
);

const TableRow: C = (props) => {
  const c = children(() => props.children);
  return <>{c()}</>;
};

type TableBodyProps = {
  hasCheckbox?: boolean;
  items: { id: string; name: string }[];
};
const TableBody: Component<TableBodyProps> = (props) => {
  return (
    <tbody class="divide-y divide-gray-100 text-sm">
      <TableRow>
        <For each={props.items}>
          {(item, i) => (
            <tr>
              {props.hasCheckbox && (
                <td class="p-2">
                  <input type="checkbox" class="h-5 w-5" value="id-1" />
                </td>
              )}
              <td class="p-2">
                <div class="font-medium text-gray-800">{item.name}</div>
              </td>
              <td class="p-2">
                <div class="flex justify-center">
                  <button>
                    <svg
                      class="h-8 w-8 rounded-full p-1 hover:bg-gray-100 hover:text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          )}
        </For>
      </TableRow>
    </tbody>
  );
};

// layout components
const Col: C = (props) => <div>{props.children}</div>;

const Grid: C = (props) => (
  <div class="grid grid-cols-2 grid-rows-1">{props.children}</div>
);

// layout: section components
type SectionHeaderProps = {
  title?: string;
  children: JSX.Element;
};
const SectionHeader: Component<SectionHeaderProps> = (props) => (
  <header class="border-figma border-b p-4">
    <div class="flex items-center justify-between">
      {props.title ? (
        <div class="font-semibold text-gray-800">{props.title}</div>
      ) : (
        <div class="flex-1" />
      )}
      <div>{props.children}</div>
    </div>
  </header>
);

const SectionBody: C = (props) => {
  return <div class="h-72 overflow-auto p-3">{props.children}</div>;
};

const SectionFooter = () => (
  <>
    <div class="border-figma flex justify-end space-x-4 border-t px-5 py-4 text-2xl font-bold" />
    <div class="flex justify-end">
      <input
        type="hidden"
        class="border border-black bg-gray-50"
        x-model="selected"
      />
    </div>
  </>
);

const IFrame: C = (props) => {
  return (
    <div style={{ width: "591px", height: "414px" }} class="bg-white shadow">
      {props.children}
    </div>
  );
};

export const FromScratch = () => {
  return (
    <IFrame>
      <Grid>
        <Col>
          <SectionHeader title="frame name">
            <CreateButton />
          </SectionHeader>
          <SectionBody>
            {/* <SearchForm /> */}
            <Table items={SCENE_ITEMS} />
          </SectionBody>
          <SectionFooter />
        </Col>
        <Col>
          <SectionHeader>
            <RemoveButton />
          </SectionHeader>
          <SectionBody>
            <Table items={NUMBER_ITEMS} hasCheckbox />
          </SectionBody>
          <SectionFooter />
        </Col>
      </Grid>
    </IFrame>
  );
};
