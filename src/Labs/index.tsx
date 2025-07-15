export default function Labs() {
  return (
    <div style={{maxWidth: 600, margin: "2rem auto"}}>
      <h2>Labs – Your Name, Section 01</h2>
      <ul>
        <li><a href="/labs/lab1">Lab 1: HTML/CSS</a></li>
        <li><a href="/labs/lab2">Lab 2: CSS/Bootstrap</a></li>
        {/* Add or remove labs as needed */}
      </ul>
      <a href="/" style={{marginRight: 16}}>← Back to Kambaz App</a>
      <div style={{marginTop: 14}}>
        <strong>Source Code Repos:</strong>
        <ul>
          <li><a href="https://github.com/yourusername/kanbaz-app" target="_blank">Kambaz Repo</a></li>
          <li><a href="https://github.com/yourusername/labs" target="_blank">Labs Repo</a></li>
        </ul>
      </div>
    </div>
  );
}
