declare module "*.css" {
  const content: string;
  export default content;
}
declare module '*.css?raw' {
  const content: string;
  export default content;
}

declare module 'dom-highlight-range' {
  interface HighlightAttributes {
    [key: string]: string;
  }

  function highlightRange(
    range: Range,
    tagName?: string,
    attributes?: HighlightAttributes
  ): () => void;

  export default highlightRange;
}
