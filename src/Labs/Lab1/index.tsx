// src/Labs/Lab1/index.tsx

const NAME = "Bo";
const SECTION = "5160";
const GITHUB_URL = "https://github.com/goldbo2002";

export default function Lab1() {
  return (
    // hardcoded links, show name section and navigation links
    <div id="wd-lab1" style={{ maxWidth: 800, margin: "2rem auto" }}>
      <h2>Lab 1</h2>
      <h3>
        {NAME} – {SECTION}
      </h3>
      <div style={{ marginBottom: 24 }}>
        <a href="#/Labs/Lab1">Lab 1</a>{" | "}
        <a href="#/Labs/Lab2">Lab 2</a>{" | "}
        <a href="#/Kambaz">Kambaz App</a>{" | "}
        <a id="wd-github" href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
          GitHub repo
        </a>
      </div>

      <div>
        <h4>Headings</h4>
        <h1>Heading 1</h1>
        <h2>Heading 2</h2>
        <h3>Heading 3</h3>
        <h4>Heading 4</h4>
      </div>

      <div>
        <h4>Paragraphs</h4>
        <p>This is the first paragraph. Paragraph tags put space between blocks of text.</p>
        <p>This is the second paragraph. Another paragraph below.</p>
        <p>This is the third paragraph.</p>
      </div>

      {/* ordered lists vs unordered */}
      <div>
        <h4>Ordered List</h4>
        <ol>
          <li>Mix ingredients.</li>
          <li>Add ingredients.</li>
          <li>Stir to combine.</li>
        </ol>
        <ol>
          <li>Toast bread.</li>
          <li>Put on jam.</li>
          <li>Eat sandwich.</li>
        </ol>

        <h4>Unordered List</h4>
        <ul>
          <li>Clean Code</li>
          <li>Deep Work</li>
          <li>The Pragmatic Programmer</li>
          <li>Thinking in Systems</li>
        </ul>
      </div>

      {/* table Q3–Q10 */}
      <div style={{ marginTop: 16 }}>
        <h4>Table – Quiz Scores (Q3–Q10)</h4>
        <table border={1} width="100%">
          <thead>
            <tr>
              <th>Quiz</th>
              <th>Class</th>
              <th>Date</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>
            {/* table rows */}
            <tr><td>Q1</td><td>HTML</td><td>6/01/25</td><td>90</td></tr>
            <tr><td>Q2</td><td>CSS</td><td>6/02/25</td><td>92</td></tr>
            <tr><td>Q3</td><td>React</td><td>6/03/25</td><td>95</td></tr>
            <tr><td>Q4</td><td>JavaScript</td><td>6/04/25</td><td>89</td></tr>
            <tr><td>Q5</td><td>Node.js</td><td>6/05/25</td><td>87</td></tr>
            <tr><td>Q6</td><td>Express</td><td>6/06/25</td><td>93</td></tr>
            <tr><td>Q7</td><td>MongoDB</td><td>6/07/25</td><td>91</td></tr>
            <tr><td>Q8</td><td>APIs</td><td>6/08/25</td><td>90</td></tr>
            <tr><td>Q9</td><td>Redux</td><td>6/09/25</td><td>88</td></tr>
            <tr><td>Q10</td><td>TypeScript</td><td>6/10/25</td><td>96</td></tr>
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3}>Average</td>
              <td>92.1</td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* images */}
      <div style={{ marginTop: 16 }}>
        <h4>Images</h4>
        <img
          id="wd-starship"
          width="400px"
          src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg"
          alt="Starship"
        />
        <br />
        <img id="wd-teslabot" src="/images/teslabot.jpg" alt="Teslabot" height={150} />
      </div>

      {/* forms */}
      <div style={{ marginTop: 16 }}>
        <h4>Forms</h4>
        <form>
          <label>Username: <input placeholder="bo" /></label> <br />
          <label>Password: <input type="password" value="123" /></label> <br />
          <label>First name: <input type="text" /></label> <br />
          <label>Last name: <input type="text" /></label> <br />

          <label>Biography:</label><br />
          <textarea cols={30} rows={5}>Lorem ipsum dolor sit amet.</textarea><br />

          <button type="button" onClick={() => alert("Life")}>Hello World!</button><br />

          <h5>Radio buttons</h5>
          <input type="radio" name="genre" />Comedy
          <input type="radio" name="genre" />Drama
          <input type="radio" name="genre" />Science Fiction
          <input type="radio" name="genre" />Fantasy

          <h5>Checkboxes</h5>
          <input type="checkbox" name="c-comedy" />Comedy
          <input type="checkbox" name="c-drama" />Drama
          <input type="checkbox" name="c-scifi" />Science Fiction
          <input type="checkbox" name="c-fantasy" />Fantasy

          <h5>Dropdowns</h5>
          <select>
            <option>Comedy</option>
            <option>Drama</option>
            <option>Science Fiction</option>
            <option>Fantasy</option>
          </select>
          <br />
          <select multiple>
            <option>Comedy</option>
            <option>Drama</option>
            <option>Science Fiction</option>
            <option>Fantasy</option>
          </select>
          <br />

          {/* other HTML types the rubric/doc calls out */}
          <label>Email: <input type="email" placeholder="jdoe@somewhere.com" /></label><br />
          <label>Starting salary: <input type="number" defaultValue={100000} placeholder="1000" /></label><br />
          <label>Rating: <input type="range" max="5" /></label><br />
          <label>Date of birth: <input type="date" /></label><br />
          <label>Upload file: <input type="file" /></label><br />
        </form>
      </div>

      <div>
        <h4>Anchor tag</h4>
        <a href="https://www.lipsum.com" target="_blank" rel="noopener noreferrer">
          click here
        </a>{" "}
        for dummy text.<br />
        <a id="wd-github" href={GITHUB_URL} target="_blank" rel="noopener noreferrer">GitHub repo</a>
      </div>
    </div>
  );
}
