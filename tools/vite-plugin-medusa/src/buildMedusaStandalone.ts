import HtmlWalker from "./lib/HtmlWalker";

function buildMedusaStandaloneHtml(originalHtml, options: {
  entryChunkFileName: string
}) {
  const walker = new HtmlWalker(originalHtml);
  const [scriptNode] = walker.findTag("script", (attributes) => {
    return attributes.src.includes(options.entryChunkFileName);
  });

  if (scriptNode) {
    const srcAttr = scriptNode.content.attributes.find(
      attr => attr.key.type === "token:attribute-key"
        && attr.key.content === "src");

    const systemJsScript = `<script src="https://cdn.jsdelivr.net/npm/systemjs@6.14.1/dist/system.min.js"></script>`;
    const systemJsAppLoaderStr = `<script>System.import("${srcAttr.value.content}")</script>`;

    const scriptTrimStartLoc = scriptNode.content.openStart.startPosition;
    const scriptTrimEndLoc = scriptNode.content.close.endPosition;

    const targetString = originalHtml.slice(scriptTrimStartLoc, scriptTrimEndLoc);

    const newHtml = originalHtml.slice(0, scriptTrimStartLoc)
      + systemJsScript + "\n"
      + systemJsAppLoaderStr + "\n"
      + originalHtml.slice(scriptTrimEndLoc + 1);

    console.log("\nMedusa transformation ok!");

    return {
      html: newHtml
    };
  } else {
    console.error("\n\n[error] Medusa transformation fail!");
    console.error(`[error] No script node found with matching entry file \`${options.entryChunkFileName}\` in the html.`);
    console.info("[error] Original HTML:\n", originalHtml);

    return {
      html: originalHtml
    };
  }
}

export default buildMedusaStandaloneHtml;
