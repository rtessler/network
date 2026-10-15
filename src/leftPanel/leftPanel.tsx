import { Component, type FormEvent, type ChangeEvent } from "react";
import type { NetworkSettings } from "../types";
import Field from "../field/field";
import "./leftPanel.scss";

type LeftPanelProps = {
  data: NetworkSettings;
  onGenerate: (data: NetworkSettings) => void;
};

type LeftPanelState = {
  data: {
    numberOfPoints: string;
    maxLinksPerPoint: string;
  };
};

export default class LeftPanel extends Component<LeftPanelProps, LeftPanelState> {
  constructor(props: LeftPanelProps) {
    super(props);
    this.state = { data: this.toFormData(props.data) };
  }

  componentDidUpdate(prevProps: LeftPanelProps) {
    if (this.props.data !== prevProps.data) {
      this.setState({ data: this.toFormData(this.props.data) });
    }
  }

  private toFormData(data: NetworkSettings): LeftPanelState["data"] {
    return {
      numberOfPoints: String(data.numberOfPoints),
      maxLinksPerPoint: String(data.maxLinksPerPoint),
    };
  }

  private handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.currentTarget;
    const nextValue =
      id === "numberOfPoints" && value !== ""
        ? String(Math.min(Number(value), 10000))
        : value;

    this.setState(({ data }) => ({
      data: { ...data, [id]: nextValue },
    }));
  };

  private handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.props.onGenerate({
      numberOfPoints: Number(this.state.data.numberOfPoints),
      maxLinksPerPoint: Number(this.state.data.maxLinksPerPoint),
    });
  };

  render() {
    const { data } = this.state;

    return (
      <div className="left-panel">
        <form className="col" onSubmit={this.handleSubmit}>
          <h3>Network</h3>
          <Field
            id="numberOfPoints"
            label="number of points"
            type="number"
            min={1}
            max={10000}
            required
            value={data.numberOfPoints}
            onChange={this.handleChange}
          />
          <Field
            id="maxLinksPerPoint"
            label="max links per point"
            type="number"
            min={0}
            required
            value={data.maxLinksPerPoint}
            onChange={this.handleChange}
          />
          <button className="btn" type="submit">
            Generate Graph
          </button>
        </form>
      </div>
    );
  }
}
