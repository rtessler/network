import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import App from "./App";
import Network from "./model/network";

vi.mock("./rightPanel/rightPanel", () => ({
  default: () => <div aria-label="Network visualization" />,
}));

describe("App", () => {
  it("renders the network controls and updates their values on submit", () => {
    render(<App />);

    const pointsInput = screen.getByLabelText("number of points");
    const linksInput = screen.getByLabelText("max links per point");

    expect(pointsInput).toBeTruthy();
    expect(linksInput).toBeTruthy();
    expect(screen.getByRole("button", { name: "Generate Graph" })).toBeTruthy();

    fireEvent.change(pointsInput, { target: { value: "300" } });
    fireEvent.change(linksInput, { target: { value: "8" } });
    fireEvent.click(screen.getByRole("button", { name: "Generate Graph" }));

    expect(pointsInput).toHaveProperty("value", "300");
    expect(linksInput).toHaveProperty("value", "8");
  });
});

describe("Network", () => {
  it("finds the shortest path between the most distant points", () => {
    const network = new Network(3, 1);
    network.points = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
    ];
    network.edges = [
      [0, 1],
      [1, 2],
    ];
    network.mostDistantPairOfPoints = [0, 2];

    network.dijkstra();

    expect(network.path).toEqual([0, 1, 2]);
  });
});
