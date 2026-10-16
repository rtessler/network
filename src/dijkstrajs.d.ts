declare module "dijkstrajs" {
  export function find_path(
    graph: Record<string, Record<string, number>>,
    source: string,
    destination: string,
  ): string[];
}
