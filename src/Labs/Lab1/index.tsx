import TOC from "../TOC";

export default function Lab1() {
  return (
    <div className="container">
      <h1>Labs Table of Contents</h1>
      <div>
        <strong>Name:</strong> Bo Gold
        <br />
        <strong>Section:</strong> Section 3
      </div>
      <TOC />

      <h2>Lab 1: HTML Basics and Forms</h2>
      
      <h3>Heading Tags Example</h3>
      <h1>Heading 1 Example</h1>
      <h2>Heading 2 Example</h2>
      <h3>Heading 3 Example</h3>
      <h4>Heading 4 Example</h4>
      <h5>Heading 5 Example</h5>
      <h6>Heading 6 Example</h6>

      <h3>Paragraph Tag Example</h3>
      <p>This is the first paragraph of Lab 1.</p>
      <p>This is a second paragraph, showing spacing.</p>
      <p>Here is a third paragraph to demonstrate multiple paragraphs on a web page.</p>

      <h3>Ordered List: How to make pancakes</h3>
      <ol>
        <li>Mix dry ingredients.</li>
        <li>Add wet ingredients.</li>
        <li>Stir until combined.</li>
        <li>Cook on a hot griddle.</li>
        <li>Flip when bubbles form.</li>
        <li>Serve with syrup.</li>
      </ol>

      <h3>Ordered List: My Favorite Recipe</h3>
      <ol>
        <li>Preheat oven to 350°F.</li>
        <li>Mix flour, sugar, and eggs.</li>
        <li>Bake for 20 minutes.</li>
      </ol>

      <h3>Unordered List: My Favorite Books</h3>
      <ul>
        <li>Dune</li>
        <li>1984</li>
        <li>The Hobbit</li>
      </ul>

      <h3>Quiz Results Table</h3>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Quiz</th>
            <th>Topic</th>
            <th>Date</th>
            <th>Grade</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Q1</td><td>HTML</td><td>2025-06-01</td><td>85</td></tr>
          <tr><td>Q2</td><td>CSS</td><td>2025-06-02</td><td>90</td></tr>
          <tr><td>Q3</td><td>JS</td><td>2025-06-03</td><td>95</td></tr>
          <tr><td>Q4</td><td>React</td><td>2025-06-04</td><td>88</td></tr>
          <tr><td>Q5</td><td>Redux</td><td>2025-06-05</td><td>91</td></tr>
          <tr><td>Q6</td><td>Node.js</td><td>2025-06-06</td><td>87</td></tr>
          <tr><td>Q7</td><td>Express</td><td>2025-06-07</td><td>85</td></tr>
          <tr><td>Q8</td><td>MongoDB</td><td>2025-06-08</td><td>92</td></tr>
          <tr><td>Q9</td><td>MERN</td><td>2025-06-09</td><td>90</td></tr>
          <tr><td>Q10</td><td>Deployment</td><td>2025-06-10</td><td>93</td></tr>
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={3}>Average</td>
            <td>89.6</td>
          </tr>
        </tfoot>
      </table>

      <h3>Image Example</h3>
      <img src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg" width="400px" alt="Starship"/>
      <br />
      {/* Fix the path if it doesn't display */}
      <img src="/images/teslabot.jpg" height="200px" alt="Teslabot" />

      <h3>Form Elements Example</h3>
      <form>
        <div className="mb-2">
          <label htmlFor="username">Username:</label>
          <input className="form-control" id="username" placeholder="jdoe" />
        </div>
        <div className="mb-2">
          <label htmlFor="password">Password:</label>
          <input className="form-control" type="password" id="password" />
        </div>
        <div className="mb-2">
          <label htmlFor="firstName">First Name:</label>
          <input className="form-control" id="firstName" placeholder="John" />
        </div>
        <div className="mb-2">
          <label htmlFor="lastName">Last Name:</label>
          <input className="form-control" id="lastName" placeholder="Doe" />
        </div>
        <div className="mb-2">
          <label htmlFor="bio">Biography:</label>
          <textarea className="form-control" id="bio" rows={3}>Lorem ipsum...</textarea>
        </div>
        <div className="mb-2">
          <button type="button" className="btn btn-success" onClick={() => alert('Life is Good!')}>Pop up alert</button>
        </div>
        <div className="mb-2">
          <label htmlFor="file-upload">Upload file:</label>
          <input type="file" id="file-upload" className="form-control" />
        </div>
        <div className="mb-2">
          <label>Favorite genre:</label>
          <div>
            <input type="radio" name="genre" id="comedy" /> <label htmlFor="comedy">Comedy</label>
            <input type="radio" name="genre" id="drama" className="ms-2"/> <label htmlFor="drama">Drama</label>
            <input type="radio" name="genre" id="scifi" className="ms-2"/> <label htmlFor="scifi">SciFi</label>
            <input type="radio" name="genre" id="fantasy" className="ms-2"/> <label htmlFor="fantasy">Fantasy</label>
          </div>
        </div>
        <div className="mb-2">
          <label>Select genres:</label>
          <div>
            <input type="checkbox" id="chk-comedy" /> <label htmlFor="chk-comedy">Comedy</label>
            <input type="checkbox" id="chk-drama" className="ms-2"/> <label htmlFor="chk-drama">Drama</label>
            <input type="checkbox" id="chk-scifi" className="ms-2"/> <label htmlFor="chk-scifi">SciFi</label>
            <input type="checkbox" id="chk-fantasy" className="ms-2"/> <label htmlFor="chk-fantasy">Fantasy</label>
          </div>
        </div>
        <div className="mb-2">
          <label htmlFor="genre-dropdown">Favorite genre (dropdown):</label>
          <select className="form-select" id="genre-dropdown">
            <option>Comedy</option>
            <option>Drama</option>
            <option>SciFi</option>
            <option>Fantasy</option>
          </select>
        </div>
        <div className="mb-2">
          <label htmlFor="genres-multiselect">Select multiple genres:</label>
          <select className="form-select" id="genres-multiselect" multiple>
            <option>Comedy</option>
            <option>Drama</option>
            <option>SciFi</option>
            <option>Fantasy</option>
          </select>
        </div>
        <div className="mb-2">
          <label htmlFor="email">Email:</label>
          <input type="email" className="form-control" id="email" />
        </div>
        <div className="mb-2">
          <label htmlFor="salary">Starting Salary:</label>
          <input type="number" className="form-control" id="salary" />
        </div>
        <div className="mb-2">
          <label htmlFor="rating">Rating:</label>
          <input type="range" className="form-range" id="rating" min="0" max="5" />
        </div>
        <div className="mb-2">
          <label htmlFor="dob">Date of Birth:</label>
          <input type="date" className="form-control" id="dob" />
        </div>
      </form>

      <h3>Anchor Tag Example</h3>
      <a href="https://www.lipsum.com" target="_blank" rel="noopener noreferrer">Get dummy text</a>
      <br />
      <a
        href="https://github.com/goldbo2002/kambaz"
        id="wd-github"
        target="_blank"
        rel="noopener noreferrer"
      >
        GitHub Repo
      </a>
    </div>
  );
}
