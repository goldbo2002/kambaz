import { useState } from "react";


export default function Lab3() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [showResult, setShowResult] = useState(true);
  const [lastAction, setLastAction] = useState<{ type: string, time: Date | null }>({
    type: "None",
    time: null,
  });

  const handleReverse = () => {
    setResult(text.split("").reverse().join(""));
    setLastAction({ type: "reverse", time: new Date() });
  };

  const handleClear = () => {
    setText("");
    setResult("");
    setLastAction({ type: "clear", time: new Date() });
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Lab 3: String Reverser</h2>
      <label>
        <input
          type="checkbox"
          checked={showResult}
          onChange={() => setShowResult(v => !v)}
        />
        Show result
      </label>
      <br />
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type something..."
      />
      <button onClick={handleReverse}>Reverse</button>
      <button onClick={handleClear}>Clear</button>
      {showResult && result && (
        <div>
          <strong>Reversed:</strong> {result}
        </div>
      )}
      <div style={{ fontSize: "0.8em", color: "#555", marginTop: 8 }}>
        Last Action: {lastAction.type} {lastAction.time ? lastAction.time.toLocaleTimeString() : ""}
      </div>
    </div>
  );
}
