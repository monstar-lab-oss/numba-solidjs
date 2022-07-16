// import { figmaRGBA } from "@/lib/utils";

function setColor({ r = 0, g = 0, b = 0, a = 1 }) {
  return <SolidPaint>{
    type: "SOLID",
    // TODO: use figmaRGBA({ r, g, b })
    color: { r: 0.213, g: 0.34, b: 0.415 },
    opacity: a,
  };
}

function setIndexNode(index: number, targetNode: SceneNode) {
  const componentNode = figma.createComponent();

  componentNode.name = `${index}`;
  componentNode.resize(24, 24);
  componentNode.cornerRadius = 24;
  componentNode.layoutMode = "HORIZONTAL";
  componentNode.fills = [setColor({ r: 24, g: 160, b: 251 })];

  const textNode = figma.createText();

  textNode.fontSize = 12;
  textNode.characters = `${index}`;
  textNode.fills = [setColor({ r: 255, g: 255, b: 255 })];
  textNode.resize(24, 24);
  textNode.textAlignHorizontal = "CENTER";
  textNode.fontName = { family: "Inter", style: "Bold" };
  textNode.lineHeight = { value: 24, unit: "PIXELS" };

  componentNode.appendChild(textNode);

  const instanceNode = componentNode.createInstance();

  // refs. https://forum.figma.com/t/known-bug-getting-x-y-coordinates-of-rectangles-within-frames-but-not-groups/7012
  const newNode = targetNode.absoluteTransform;

  instanceNode.x = newNode[0][2] - 8;
  instanceNode.y = newNode[1][2] - 8;

  componentNode.remove();
  return instanceNode;
}
/**
 *
 */
figma.showUI(__html__, { themeColors: true, width: 450, height: 300 });
/**
 * Messages
 */
figma.on("selectionchange", () => {
  const current = figma.currentPage.selection;
  figma.ui.postMessage({ type: "SELECTION_CHANGE", payload: !!current.length });
});

figma.on("run", async () => {
  console.clear();

  await Promise.all([
    figma.loadFontAsync({ family: "Inter", style: "Regular" }),
    figma.loadFontAsync({ family: "Inter", style: "Bold" }),
  ]);

  figma.ui.postMessage({
    type: "RUN",
    payload: null,
  });
});

figma.ui.onmessage = (msg) => {
  if (msg.type === "CREATE_INDEX") {
    // Currently creating index badge for single object. should we need to support multiple?
    const [current] = figma.currentPage.selection;

    const indexNode = setIndexNode(1, current);
    figma.viewport.scrollAndZoomIntoView([indexNode]);
    figma.currentPage.appendChild(indexNode);
  }

  //FIXME: prevent close in developing
  // figma.closePlugin();
};

export {};
