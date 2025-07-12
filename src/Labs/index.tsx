import TOC from "./TOC";

export default function Labs() {
  return (
    <div className="container">
      <h1>Labs Table of Contents</h1>
      <div>
        <strong>Name:</strong> Bo Gold
        <br/>
        <strong>Section:</strong> Section 3
      </div>
      <TOC />
      <a
        href="https://github.com/goldbo2002/kambaz.git"
        id="wd-github"
        target="_blank"
        rel="noopener noreferrer"
        style={{ display: "block", marginTop: 20 }}
      >
        View Source Code on GitHub
      </a>
    </div>
  );
}
