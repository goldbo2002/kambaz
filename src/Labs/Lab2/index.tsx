import "./index.css";

export default function Lab2() {
  return (
    
    <div> <a href="/" style={{marginBottom: 18, display: "inline-block"}}>← Back to Kambaz App</a>

      <h2>Trying out a bunch of CSS stuff (Lab 2)</h2>

      {/*id slectors*/}
      <section>
        <h3>Color ID?</h3>
        <p id="crazyWhiteOnRed">ID white text, red bg</p>
        <p id="banana">Black words, yellow banana color bg (id)</p>
      </section>

      <section>
        <h3 className="blue-on-yellow">Class: Blue on Yellow</h3>
        <p className="blue-on-yellow">
          It’s a class, so this should look just like the heading above
        </p>
      </section>

      {/* Random doc structure */}
      <section>
        <h3>Nested styling: structure </h3>
        <div id="structureDemoDiv">
          This whole box is white on red.  
          <span className="tinyBlueYellow">But this part goes blue/yellow.</span>
        </div>
      </section>

      <section>
        <h3>Color in foreground</h3>
        <h4 className="bluer">Heading is blue on white</h4>
        <div className="justRed">Trying a red on white text here, why not</div>
        <div className="shrekGreen">Green text on white, for fun</div>
      </section>

      <section>
        <h3>Border stuff</h3>
        <h4 className="whitey">White on blue bg heading, border too</h4>
        <div className="blackOnRedBox">Chunky black on red paragraph</div>
        <span className="greenish">white on green background span</span>
        <div className="fatRed">
          My favorite: thick red border<br />
          (needed for the lab)
        </div>
        <div className="blueDashed">
          Skinny blue, dashed border. Like a coupon or something?
        </div>
      </section>

      {/* spacing */}
      <section>
        <h3>Padding & Margins</h3>
        <div className="bordered weirdPad yellowbg">Super fat red border, yellow, crazy top/left padding</div>
        <div className="bordered blueYellowBot">Blue border, yellow bg, thick bottom padding only</div>
        <div className="allSides">Yellow border, blue bg, big all around padding</div>
        <div className="bordered spacedout">Red border, yellow bg, margin on bottom for air</div>
        <div className="centeredBox">Blue border, yellow bg, why not center this?</div>
        <div className="bigMarginBox">Yellow border, blue bg, huge margins everywhere</div>
      </section>

      <section>
        <h3>Rounded Corners</h3>
        <div className="radiusDiv tltr">Just the top left/right corners</div>
        <div className="radiusDiv blbr">Bottom left/right, so round</div>
        <div className="radiusDiv superRound">Go wild, all corners</div>
        <div className="radiusDiv notTopRight">Skip top right for fun</div>
      </section>

      <section>
        <h3>bigger</h3>
        <div className="sizeDemo longWide">Yellow, wider than tall</div>
        <div className="sizeDemo tallishBlue">Blue, much taller</div>
        <div className="sizeDemo perfectRed">Red, equal height/width</div>
      </section>


      <section>
        <h3>random</h3>
        <div className="posFun relDownRight">Yellow box, shifted down+right</div>
        <div className="posFun relUpRight">Blue box, nudged up+right</div>
        <div className="posHolder">
          <div className="absBox porty">Portrait</div>
          <div className="absBox lands">Landscape</div>
          <div className="absBox squarey">Square</div>
        </div>
        <div className="fixMe fixedBox">Blue fixed box: always visible!</div>
      </section>

      {/* Z-Index experiment */}
      <section>
        <h3>Zee Index Demo</h3>
        <div className="zArea">
          <div className="absBox porty">Portrait (bottom)</div>
          <div className="absBox lands onTop">Landscape (should be above)</div>
          <div className="absBox squarey">Square</div>
        </div>
      </section>

  
      <section>
        <h3>Float like a rectangle</h3>
        <div className="floatLine">
          <div className="floaty">A</div>
          <div className="floaty">B</div>
          <div className="floaty">C</div>
        </div>
        <div className="floatWithImg">
          <img
            src="https://placekitten.com/100/100"
            className="floatRightPic"
            alt="Floating kitten"
          />
          This text wraps around the pic
        </div>
      </section>
      <section>
        <h3>CSS Grid: easy 4-up</h3>
        <div className="gridFour">
          <div className="gCell">Grid 1</div>
          <div className="gCell">Grid 2</div>
          <div className="gCell">Grid 3</div>
          <div className="gCell">Grid 4</div>
        </div>
      </section>
      <section>
        <h3>Flex row (modern columns)</h3>
        <div className="flexThree">
          <div className="fItem">Column A</div>
          <div className="fItem">Column B</div>
          <div className="fItem">Column C</div>
        </div>
      </section>

      {/* Icons */}
      <section>
        <h3>Just some icons</h3>
        <div className="iconsFlex">
          <span role="img" aria-label="house">🏠</span>
          <span role="img" aria-label="star">⭐</span>
          <span role="img" aria-label="book">📚</span>
          <span role="img" aria-label="rocket">🚀</span>
          <span role="img" aria-label="mail">📧</span>
          <span role="img" aria-label="check">✅</span>
        </div>
      </section>
            {/* Kanbas Modules Demo */}
      <section>
        <h3>Kanbas Modules Preview</h3>
        <div style={{background: "#f8f9fa", borderRadius: 8, padding: 18, border: "1px solid #ccc", marginBottom: 16}}>
          <div className="mb-2">
            <button className="btn btn-outline-secondary btn-sm me-2">Collapse All</button>
            <button className="btn btn-outline-secondary btn-sm me-2">View Progress</button>
            <button className="btn btn-danger btn-sm">+ Module</button>
          </div>
          <div className="module" style={{background: "#ececec", borderRadius: 7, padding: 10, marginBottom: 7, display: "flex", alignItems: "center"}}>
            <span style={{fontSize: "1.2em", marginRight: 7}}>📦</span>
            <strong>Module 1: Intro to Web</strong>
            <span className="ms-auto" style={{fontSize: "0.9em"}}>Controls ▶️</span>
          </div>
          <div style={{background: "#fff", borderLeft: "5px solid #42b983", padding: 8, marginBottom: 3, display: "flex", alignItems: "center"}}>
            <span style={{fontSize: "1.1em", marginRight: 7}}>📄</span>
            Lesson 1.1: What is the Web?
            <span className="ms-auto" style={{fontSize: "0.9em"}}>📝</span>
          </div>
          <div style={{background: "#fff", borderLeft: "5px solid #42b983", padding: 8, marginBottom: 3, display: "flex", alignItems: "center"}}>
            <span style={{fontSize: "1.1em", marginRight: 7}}>📄</span>
            Lesson 1.2: How Browsers Work
            <span className="ms-auto" style={{fontSize: "0.9em"}}>📝</span>
          </div>
          <div className="module" style={{background: "#ececec", borderRadius: 7, padding: 10, marginBottom: 7, display: "flex", alignItems: "center"}}>
            <span style={{fontSize: "1.2em", marginRight: 7}}>📦</span>
            <strong>Module 2: CSS Basics</strong>
            <span className="ms-auto" style={{fontSize: "0.9em"}}>Controls ▶️</span>
          </div>
          <div style={{background: "#fff", borderLeft: "5px solid #42b983", padding: 8, marginBottom: 3, display: "flex", alignItems: "center"}}>
            <span style={{fontSize: "1.1em", marginRight: 7}}>📄</span>
            Lesson 2.1: Selectors
            <span className="ms-auto" style={{fontSize: "0.9em"}}>📝</span>
          </div>
        </div>
      </section>
      {/* Kanbas Assignments Demo */}
      <section>
        <h3>Kanbas Assignments List Preview</h3>
        <div style={{background: "#fafaff", borderRadius: 8, padding: 14, border: "1px solid #ddd"}}>
          <div className="d-flex mb-2" style={{gap: 8}}>
            <input className="form-control w-50" placeholder="Search for Assignment" />
            <button className="btn btn-danger btn-sm ms-auto">+ Group</button>
            <button className="btn btn-danger btn-sm">+ Assignment</button>
          </div>
          <ul className="list-group">
            <li className="list-group-item d-flex align-items-center" style={{borderLeft: "5px solid #42b983"}}>
              <span style={{fontSize: "1.2em", marginRight: 8}}>📝</span>
              <span>
                <strong>A1: HTML Intro</strong>
                <div style={{fontSize: "0.88em", color: "#666"}}>Due 7/19 – 100 pts</div>
              </span>
            </li>
            <li className="list-group-item d-flex align-items-center" style={{borderLeft: "5px solid #42b983"}}>
              <span style={{fontSize: "1.2em", marginRight: 8}}>📝</span>
              <span>
                <strong>A2: CSS Lab</strong>
                <div style={{fontSize: "0.88em", color: "#666"}}>Due 7/26 – 100 pts</div>
              </span>
            </li>
          </ul>
        </div>
      </section>
            {/* Kanbas People Demo */}
      <section>
        <h3>People (random classmates for demo)</h3>
        <table className="table table-hover table-sm" style={{maxWidth: 430, margin: "auto"}}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Kim Frank</td>
              <td>Student</td>
              <td>Kim@northeastern.edu</td>
            </tr>
            <tr>
              <td>Chloe Byers</td>
              <td>TA</td>
              <td>Chloe@northeastern.edu</td>
            </tr>
            <tr>
              <td>Jack Kennedy</td>
              <td>Student</td>
              <td>Jack@northeastern.edu</td>
            </tr>
          </tbody>
        </table>
      </section>

    </div>
  );
}
