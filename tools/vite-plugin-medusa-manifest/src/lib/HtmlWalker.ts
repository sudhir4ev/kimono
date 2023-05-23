import { constructTree, tokenize } from "hyntax";
import { findNode, TagMatchOption } from "./treeWalkerUtils";

class HtmlWalker {
  tokens;
  ast;

  constructor(src) {
    this.tokens = (tokenize)(src).tokens;
    this.ast = (constructTree)(this.tokens).ast;
  }

  findTag(tagName, match?: TagMatchOption) {
    return findNode(this.ast, tagName, match);
  }
}

export default HtmlWalker;
