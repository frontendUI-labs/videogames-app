export function createDOM(string: string): Node {
  const parser = new DOMParser();
  const HTML = parser.parseFromString(string, "text/html");
  return HTML.body.firstChild as Node;
}
