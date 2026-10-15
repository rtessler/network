import { find_path } from "dijkstrajs";

export type Point = {
  x: number;
  y: number;
};

export type Edge = [number, number];

export default class Network {
  numberOfPoints: number;
  maxLinksPerPoint: number;
  width = 0;
  height = 0;
  points: Point[] = [];
  edges: Edge[] = [];
  path: number[] = [];
  mostDistantPairOfPoints: [number, number] = [0, 0];

  constructor(numberOfPoints: number, maxLinksPerPoint: number) {
    this.numberOfPoints = numberOfPoints;
    this.maxLinksPerPoint = maxLinksPerPoint;
  }

  distance(a: Point, b: Point): number {
    return Math.hypot(a.x - b.x, a.y - b.y);
  }

  generatePoints() {
    this.points = [];
    const margin = 5;

    for (let i = 0; i < this.numberOfPoints; i++) {
      const x = margin + (this.width - 2 * margin) * Math.random();
      const y = margin + (this.height - 2 * margin) * Math.random();
      this.points.push({ x, y });
    }
  }

  findClosestNPoints(index: number, n: number): number[] {
    if (index < 0 || index >= this.points.length || this.points.length < n) {
      return [];
    }

    const closest: number[] = [];
    const point = this.points[index];

    for (let i = 0; i < n; i++) {
      let closestIndex = -1;
      let closestDistance = Number.MAX_VALUE;

      for (let j = 0; j < this.points.length; j++) {
        if (j !== index && !closest.includes(j)) {
          const distance = this.distance(this.points[j], point);

          if (distance < closestDistance) {
            closestIndex = j;
            closestDistance = distance;
          }
        }
      }

      closest.push(closestIndex);
    }

    return closest;
  }

  findEdge(a: number, b: number): boolean {
    return this.edges.some(
      (edge) =>
        (edge[0] === a && edge[1] === b) ||
        (edge[0] === a && edge[1] === b),
    );
  }

  generateEdges() {
    this.edges = [];

    for (let i = 0; i < this.points.length; i++) {
      const count = Math.floor(1 + Math.random() * this.maxLinksPerPoint);
      const closest = this.findClosestNPoints(i, count);

      for (let j = 0; j < count; j++) {
        if (closest[j] !== -1 && !this.findEdge(i, closest[j])) {
          this.edges.push([i, closest[j]]);
        }
      }
    }
  }

  findMostDistantPairOfPoints() {
    this.mostDistantPairOfPoints = [0, 0];
    let greatestDistance = 0;

    for (let i = 0; i < this.points.length; i++) {
      for (let j = 0; j < this.points.length; j++) {
        const distance = this.distance(this.points[i], this.points[j]);

        if (distance > greatestDistance) {
          this.mostDistantPairOfPoints = [i, j];
          greatestDistance = distance;
        }
      }
    }
  }

  dijkstra() {
    const graph: Record<string, Record<string, number>> = {};
    this.path = [];

    this.points.forEach((_point, index) => {
      graph[String(index)] = {};
    });

    this.edges.forEach(([from, to]) => {
      const distance = this.distance(this.points[from], this.points[to]);
      graph[String(from)][String(to)] = distance;
      graph[String(to)][String(from)] = distance;
    });

    try {
      const [start, destination] = this.mostDistantPairOfPoints;
      this.path = find_path(graph, String(start), String(destination)).map(
        Number,
      );
    } catch (error) {
      console.error(error);
    }
  }

  generate() {
    this.generatePoints();
    this.generateEdges();
    this.findMostDistantPairOfPoints();
    this.dijkstra();
  }
}
