import { Component, createRef } from "react";
import Network from "../model/network";
import "./rightPanel.scss";

type RightPanelProps = {
  numberOfPoints: number;
  maxLinksPerPoint: number;
};

export default class RightPanel extends Component<RightPanelProps> {
  private network: Network;
  private panelRef = createRef<HTMLDivElement>();
  private canvasRef = createRef<HTMLCanvasElement>();

  constructor(props: RightPanelProps) {
    super(props);
    this.network = new Network(props.numberOfPoints, props.maxLinksPerPoint);
  }

  componentDidMount() {
    this.createCanvas();
  }

  componentDidUpdate(prevProps: RightPanelProps) {
    if (
      this.props.numberOfPoints !== prevProps.numberOfPoints ||
      this.props.maxLinksPerPoint !== prevProps.maxLinksPerPoint
    ) {
      this.network.numberOfPoints = this.props.numberOfPoints;
      this.network.maxLinksPerPoint = this.props.maxLinksPerPoint;
      this.network.generate();
      this.drawNetwork();
    }
  }

  private getCanvasContext(): CanvasRenderingContext2D {
    const context = this.canvasRef.current?.getContext("2d");

    if (!context) {
      throw new Error("Unable to get a 2D rendering context for the canvas.");
    }

    return context;
  }

  private createCanvas() {
    const panel = this.panelRef.current;
    const canvas = this.canvasRef.current;

    if (!panel || !canvas) {
      throw new Error("Unable to initialize the network canvas.");
    }

    const margin = 10;
    const width = Math.max(0, panel.clientWidth - 2 * margin);
    const height = Math.max(0, panel.clientHeight - 2 * margin);

    canvas.width = width;
    canvas.height = height;
    this.network.width = width;
    this.network.height = height;
    this.network.generate();
    this.drawNetwork();
  }

  private drawCircle(index: number) {
    const point = this.network.points[index];
    const context = this.getCanvasContext();
    const [first, second] = this.network.mostDistantPairOfPoints;

    context.beginPath();
    context.arc(point.x, point.y, 5, 0, 2 * Math.PI, false);
    context.fillStyle =
      first === index || second === index
        ? "rgba(0, 0, 255, 1)"
        : "rgba(255, 0, 0, 1)";
    context.fill();
  }

  private drawLine(edge: [number, number]) {
    const context = this.getCanvasContext();
    const [from, to] = edge;
    const start = this.network.points[from];
    const end = this.network.points[to];

    context.beginPath();
    context.moveTo(start.x, start.y);
    context.lineTo(end.x, end.y);
    context.strokeStyle = "#ccc";
    context.stroke();
  }

  private drawPath() {
    const context = this.getCanvasContext();
    context.beginPath();

    this.network.path.forEach((index, position) => {
      const point = this.network.points[index];

      if (position === 0) {
        context.moveTo(point.x, point.y);
      } else {
        context.lineTo(point.x, point.y);
        context.strokeStyle = "#00ff00";
        context.stroke();
      }
    });
  }

  private drawNetwork() {
    const canvas = this.canvasRef.current;

    if (!canvas) {
      throw new Error("Unable to draw the network without a canvas.");
    }

    this.getCanvasContext().clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < this.network.points.length; i++) {
      this.drawCircle(i);
    }

    for (const edge of this.network.edges) {
      this.drawLine(edge);
    }

    this.drawPath();
  }

  render() {
    return (
      <div className="right-panel" ref={this.panelRef}>
        <div className="canvas-container">
          <canvas id="canvas" ref={this.canvasRef} />
        </div>
      </div>
    );
  }
}
