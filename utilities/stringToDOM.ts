export function createDOM(string: string): HTMLElement {
  const parser = new DOMParser();
  const HTML = parser.parseFromString(string, "text/html");
  return HTML.body.firstChild as HTMLElement;
}
