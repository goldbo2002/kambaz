// src/Labs/Lab1/index.tsx

const NAME = "Bo"; // Change to your name
const SECTION = "5160"; // Change to your section
const GITHUB_URL = "https://github.com/goldbo2002";

export default function Lab1() {
  return (
    <div id="wd-lab1" style={{ maxWidth: 800, margin: "2rem auto" }}>
      <h2>Lab 1</h2>
      <h3>{NAME} – {SECTION}</h3>
      <div style={{ marginBottom: 24 }}>
        <a href="#/Labs/Lab1">Lab 1</a>{" | "}
        <a href="#/Labs/Lab2">Lab 2</a>{" | "}
        <a href="#/Kambaz">Kambaz App</a>{" | "}
        <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">GitHub</a>
      </div>

      <h3>HTML Examples</h3>
      <div>
        <h1>h1 Heading</h1>
        <h2>h2 Heading</h2>
        <h3>h3 Heading</h3>
        <h4>h4 Heading</h4>
      </div>

      <div>
        <h4>Paragraphs</h4>
        <p>This is the first paragraph. Paragraph tags put space between blocks of text.</p>
        <p>This is the second paragraph. Another paragraph below.</p>
        <p>This is the third paragraph.</p>
      </div>

      <div>
        <h4>Ordered List</h4>
        <ol>
          <li>Mix dry ingredients.</li>
          <li>Add wet ingredients.</li>
          <li>Stir to combine.</li>
        </ol>
        <ol>
          <li>Toast bread.</li>
          <li>Spread peanut butter.</li>
          <li>Top with banana slices.</li>
        </ol>
        <h4>Unordered List</h4>
        <ul>
          <li>Dune</li>
          <li>Lord of the Rings</li>
          <li>Ender's Game</li>
        </ul>
        <ul>
          <li>The Hobbit</li>
          <li>Neuromancer</li>
          <li>Ready Player One</li>
        </ul>
      </div>

      <div>
        <h4>Table</h4>
        <table border={1} width="100%">
          <thead>
            <tr>
              <th>Quiz</th>
              <th>Topic</th>
              <th>Date</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>
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

      <div>
        <h4>Images</h4>
        <img width="400px" src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg" alt="Starship" />
        <br />
        <img src="/images/teslabot.jpg" height="200px" alt="Teslabot" />
      </div>

      <div>
        <h4>Forms</h4>
        <form>
          <label>Username: <input placeholder="jdoe" /></label> <br />
          <label>Password: <input type="password" value="123@#$asd" /></label> <br />
          <label>First name: <input type="text" /></label> <br />
          <label>Last name: <input type="text" /></label> <br />
          <label>Biography:</label><br/>
          <textarea cols={30} rows={5}>Lorem ipsum dolor sit amet.</textarea><br/>
          <button type="button" onClick={() => alert('Life is Good!')}>Hello World!</button><br/>
          <h5>Radio buttons</h5>
          <input type="radio" name="genre" />Comedy
          <input type="radio" name="genre" />Drama
          <input type="radio" name="genre" />Science Fiction
          <input type="radio" name="genre" />Fantasy
          <h5>Checkboxes</h5>
          <input type="checkbox" name="genre" />Comedy
          <input type="checkbox" name="genre" />Drama
          <input type="checkbox" name="genre" />Science Fiction
          <input type="checkbox" name="genre" />Fantasy
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
          <label>Email: <input type="email" /></label><br />
          <label>Starting salary: <input type="number" /></label><br />
          <label>Rating: <input type="range" max="5" /></label><br />
          <label>Date of birth: <input type="date" /></label><br />
          <label>Upload file: <input type="file" /></label><br />
        </form>
      </div>

      <div>
        <h4>Anchor tag</h4>
        <a href="https://www.lipsum.com" target="_blank" rel="noopener noreferrer">click here</a> for dummy text.<br />
        <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">GitHub repo</a>
      </div>
    </div>
  );
}
