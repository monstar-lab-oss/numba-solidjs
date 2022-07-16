figma.showUI(__html__, { themeColors: true, width: 450, height: 300 });
/**
 *
 */
figma.on("selectionchange", () => {
  const current = figma.currentPage.selection;
  figma.ui.postMessage({ type: "SELECTION_CHANGE", payload: !!current.length });
});
/**
 *
 */
figma.on("run", () => {
  console.clear();

  figma.ui.postMessage({
    type: "RUN",
    payload: null,
  });
});
/**
 *
 */
figma.ui.onmessage = (msg) => {
  if (msg.type === "CREATE_INDEX") {
    // TODO: not yet implemented
    console.log(msg);
    // const node = figma.createRectangle();
    // figma.currentPage.appendChild(node);
    // figma.currentPage.selection = [node];
    // figma.viewport.scrollAndZoomIntoView([node]);
  }

  //FIXME: prevent close in developing
  // figma.closePlugin();
};

export {};
