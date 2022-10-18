# NUMBA

Figma plugin for easy numbering with 1-click.

## Installation

Install it with npm:

```sh
npm ci
```

## Getting started with plugin development

First start vite:

```sh
npm run dev
```

It will automatically build if you make changes to the code.

Then in Figma go to `File Menu > Plugins > Development > Import plugin from manifest...` and select the `manifest.json` file.

## Build

Builds the app for production to the dist folder.

```sh
npm run build
```

### Update to new versions

Please refer to the [Release-Assets](/wiki/How-to-Develop#Release-Assets) page for this and other information.

## Architecture

### How rendering works

Renderer architecture displayed on the scheme:

![](https://mermaid.ink/svg/pako:eNptUbtuwzAM_BWBczrE3jx0cVG4QL3U6GR5YC3GNhpJhh5DEeffSykN2qARQOB04pHi8QSjVQQVTA7XWby-SSONjx-X6_MyaZRGiLbXuJhBGjIqZbTigc-myXucaBNd3wXraLhRv78kadM31n76gRWPm1r8imGcWZHeriFEve9rq1fLDcLwQxX_qfKGyuS1Rr1PHUSTcfEHl784RZc_4ngQchur7nDFHa7MswvYgSbHZij27JRrQphJk4SKoaIDxmOQIM2ZUzEG232ZEargIu0grgoDPS3IBmmoDnj0zJJa2Lz2soe8jvM3eEyC6w)

<details>
<summary><code>mermaid</code></summary>

```
graph LR

subgraph Figma
  M[main]
end

M ----|message| S[Store]

subgraph UI
  H[Hooks] -->|dispatch| S

  C1[Component] --> H
  C2[Component] --> H
  C3[Component] --> H

  S -->|render| C1
  S -->|render| C2
  S -->|render| C3
end
```

</details>

### File structure

```
├── manifest.json
├── src
|  ├── app.tsx
|  ├── components
|  |  ├── ComponentName.module.css
|  |  ├── ComponentName.stories.tsx
|  |  └── ComponentName.tsx
|  ├── constants.ts
|  ├── lib
|  |  ├── dispatch.ts
|  |  ├── hooks
|  |  ├── store.ts
|  |  └── utils
|  └── main.ts
└──   types
```

- `/manifest.json` - Figma plugin need to be configured with manifest.json should contains main and ui threads.
- `/src`
  - `app.tsx` - Core of UI renderer based on Solid.
  - `/components` - UI functions that return JSX and called by JSX in other components.
  - `/constants` - Literal values that can be called from any expression.
  - `/lib`
    - `/dispatch` - A function to posts a message to the main and ui threads.
    - `/hooks` - Functions to reuse stateful logic with fully isolated states.
    - `/store.ts` - Proxy objects that allow a tree of signals to be independently tracked and modified.
    - `/utils` - Helper functions.
  - `/main.ts` - Functions that can create/update specific Figma nodes and handle the messages.
  - `/types` - Common type of components.
