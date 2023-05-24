export function findNode(ast, type, match: TagMatchOption, context = { results: [] }) {
  const currentNode = ast;
  context.results = context.results || [];

  const { nodeType } = currentNode;
  const hasChildren = NODES_WITH_CHILDREN.includes(nodeType)
    || currentNode.content?.children?.length > 0;

  if (nodeType === type) {
    const attrs = getTagAttributes(currentNode);
    const isMatching = match?.(attrs);
    isMatching && context.results.push(currentNode);
    return;
  }

  if (hasChildren) {
    const { children } = currentNode.content;
    children.forEach(node => {
      return findNode(node, type, match, context);
    });
  }

  return context.results;
}

export function getTagAttributes(tagNode): { [s: string]: string } {
  let result = {};
  const { attributes = [] } = tagNode.content;

  attributes.forEach(attribute => {
    const { key, value } = attribute;
    result[key.content] = value ? cleanAttrValue(value.content) : undefined;
  });

  return result;
}

function cleanAttrValue(str: string) {
  return str.trim();
}

const NODES_WITH_CHILDREN = ["document"];

type TagMatchFn = (attributes: { [s: string]: string }) => boolean

export type TagMatchOption = TagMatchFn | undefined
