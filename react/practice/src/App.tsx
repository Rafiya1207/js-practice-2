import { useState } from "react";
import { Colors } from "./Colors";

const usePrevious = (newValue: string) => {
  const [color, setColor] = useState("white");

  const onChange = () => setColor(newValue);

  return { color, setColor: onChange };
};

const ColorsApp = () => {
  const c = new Colors();
  const currentColor = c.get();
  const { color, setColor } = usePrevious(currentColor);
  return (
    <>
      <div style={{ backgroundColor: color, width: "100px", height: "100px" }}>
      </div>
      <div
        style={{
          backgroundColor: currentColor,
          width: "100px",
          height: "100px",
        }}
      >
      </div>
      <button onClick={setColor}>next</button>
    </>
  );
};

type Data = {
  text: string;
};

const App = () => {
  const [data, setData] = useState<Data[]>([]);

  return (
    <>
      <button
        onClick={() => {
          fetch("http://localhost:8000/api/data.json").then((x) => x.json()).then(setData);
        }}
      >
        fetch
      </button>

      <ul>
        {data.map((x, id) => <li key={id}>{x.text}</li>)}
      </ul>
    </>
  );
};

export default App;
