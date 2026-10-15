import { useState } from "react";
import type { NetworkSettings } from "./types";
import LeftPanel from "./leftPanel/leftPanel";
import RightPanel from "./rightPanel/rightPanel";
import "./App.scss";

export default function App() {
  const [data, setData] = useState<NetworkSettings>({
    numberOfPoints: 200,
    maxLinksPerPoint: 5,
  });

  return (
    <div className="app">
      <LeftPanel data={data} onGenerate={(newData) => setData({ ...newData })} />
      <RightPanel
        numberOfPoints={data.numberOfPoints}
        maxLinksPerPoint={data.maxLinksPerPoint}
      />
    </div>
  );
}
