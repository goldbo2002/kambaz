import { useState } from "react";


export default function Lab4() {
  const [count, setCount] = useState(0);
  const [isBlue, setIsBlue] = useState(false);
  const [label, setLabel] = useState("Click me");
  const [clickedAt, setClickedAt] = useState<Date | null>(null);
  const [profile, setProfile] = useState({
    name: "Zippy",
    mood: "chill"
  });
  const [history, setHistory] = useState<string[]>([]);

  function handleMagicClick(event: React.MouseEvent<HTMLButtonElement>, amount: number) {
    setCount(c => c + amount);
    setClickedAt(new Date());
    setLabel(`Clicked +${amount}!`);
    setHistory(h => [`Clicked +${amount} at ${new Date().toLocaleTimeString()}`, ...h]);
    if (event.shiftKey) {
      setLabel("Whoa, shift click!");
    }
  }

  const ChildButton = ({ label, onChildClick }: { label: string, onChildClick: (e: React.MouseEvent<HTMLButtonElement>) => void }) => (
    <button onClick={onChildClick}>
      {label}
    </button>
  );

  const toggleBlue = () => setIsBlue(v => !v);

  const changeMood = () => setProfile(p => ({ ...p, mood: p.mood === "chill" ? "hyped" : "chill" }));

  return (
    <div style={{ margin: "auto", maxWidth: 420, padding: 24, background: isBlue ? "#d0e3ff" : "#f7f7ff", borderRadius: 10 }}>
      <h2>Lab 4: User Events (& State)</h2>
      <div>
        <button onClick={e => handleMagicClick(e, 1)}>Add 1</button>
        <button onClick={e => handleMagicClick(e, 5)}>Add 5</button>
        <button onClick={toggleBlue}>
          {isBlue ? "Not Blue" : "Blue Mode"}
        </button>
        <button onClick={changeMood}>
          Mood: {profile.mood}
        </button>
      </div>
      <div>
        <span>{label}</span> | Count: {count}
      </div>
      <div>
        Last clicked: {clickedAt ? clickedAt.toLocaleString() : "Never"}
      </div>
      <ChildButton label="Child says hi" onChildClick={() => setLabel("Child says hi!")} />
      <div style={{ marginTop: 12 }}>
        <strong>History:</strong>
        <ul style={{ maxHeight: 80, overflowY: "auto", fontSize: "0.9em" }}>
          {history.slice(0, 6).map((h, i) => <li key={i}>{h}</li>)}
        </ul>
      </div>
    </div>
  );
}
