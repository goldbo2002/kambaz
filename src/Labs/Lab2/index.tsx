// src/Labs/Lab2/index.tsx
//Bo Gold

import "./index.css";
import {
  FaStar,
  FaRocket,
  FaCode,
  FaHeart,
  FaCoffee,
  FaBook,
} from "react-icons/fa";

export default function Lab2() {
  return (
    <div id="wd-lab2" className="container my-4">
      {/* little fixed black breakpoint badge (top-left) */}
      <div id="wd-breakpoint-badge" className="breakpoint-badge">
        <span className="d-inline d-sm-none">XS</span>
        <span className="d-none d-sm-inline d-md-none">SM</span>
        <span className="d-none d-md-inline d-lg-none">MD</span>
        <span className="d-none d-lg-inline d-xl-none">LG</span>
        <span className="d-none d-xl-inline">XL+</span>
      </div>

      <h2 className="mb-3">Lab 2</h2>

      {/* ---------------- CSS: selectors & colors ---------------- */}
      <section className="mb-4">
        <h3>CSS — Selectors & Colors</h3>

        {/* ID selectors */}
        <p id="whiteOnRed">This paragraph is white on red (ID selector).</p>
        <p id="blackOnYellow">
          This paragraph is black on yellow (ID selector).
        </p>

        {/* Class selectors */}
        <p className="blueOnYellow">
          This paragraph is blue on yellow (class selector).
        </p>
        <h4 className="blueOnYellowHeading">
          This heading is blue on yellow (class selector).
        </h4>

        {/* Document structure */}
        <div className="whiteOnRedDiv p-2">
          White on red DIV. Inside here is a{" "}
          <span className="smallSpan">small blue on yellow span</span>.
        </div>

        {/* Foreground color helpers */}
        <h4 className="blueHeading mt-3">Blue on white heading</h4>
        <p className="redText">Red on white text</p>
        <p className="greenText">Green on white text</p>

        {/* Background helpers */}
        <h4 className="whiteOnBlueHeading">White on blue heading</h4>
        <p className="blackOnRed">Black on red paragraph</p>
        <span className="whiteOnGreen p-1 d-inline-block">
          White on green span
        </span>
      </section>

      {/* ---------------- CSS: borders / margins / padding ---------------- */}
      <section className="mb-4">
        <h3>CSS — Borders, Margins, Padding</h3>

        <div className="fatRedBorder mb-2 p-2">Fat red border</div>
        <div className="thinBlueDashed mb-2 p-2">Thin blue dashed border</div>

        <div className="padTopLeft mb-2">Big padding on top/left (red/yellow)</div>
        <div className="padBottom mb-2">Big padding at bottom (blue/yellow)</div>
        <div className="padAll mb-2">Big padding all around (yellow/blue)</div>
        <div className="marginBottom mb-2">
          Margin at bottom (red/yellow with margin-bottom)
        </div>
        <div className="centered mb-2">Centered block (blue/yellow)</div>
        <div className="bigMargins mb-2">Big margins all around</div>
      </section>

      {/* ---------------- CSS: corners & dimensions ---------------- */}
      <section className="mb-4">
        <h3>CSS — Corners & Dimensions</h3>

        <div className="topRounded demoBox mb-2">Top left/right rounded</div>
        <div className="bottomRounded demoBox mb-2">
          Bottom left/right rounded
        </div>
        <div className="allRounded demoBox mb-2">All corners rounded</div>
        <div className="exceptTopRight demoBox mb-2">
          Rounded everywhere except top-right
        </div>

        <div className="wideYellow demoBox mb-2">Yellow: wider than tall</div>
        <div className="tallBlue demoBox mb-2">Blue: taller than wide</div>
        <div className="redSquare demoBox mb-2">Red square</div>
      </section>

      {/* ---------------- CSS: positioning & z-index ---------------- */}
      <section className="mb-4">
        <h3>CSS — Positioning</h3>

        <div className="relYellow demoBox mb-2">
          Relative: nudged down and right
        </div>
        <div className="relBlue demoBox mb-3">
          Relative: moved up a bit and right
        </div>

        <div className="positionStage mb-3">
          <div className="portrait">Portrait</div>
          <div className="landscape">Landscape (above others)</div>
          <div className="square">Square</div>
        </div>

        <div className="fixedBlue">Fixed blue rectangle</div>
      </section>

      {/* ---------------- CSS: floats, grid, flex ---------------- */}
      <section className="mb-4">
        <h3>CSS — Floats, Grid, Flex</h3>

        <div className="floatRow clearfix mb-2">
          <div className="floatA">A</div>
          <div className="floatB">B</div>
          <div className="floatC">C</div>
        </div>

        <div className="mb-2">
          <img
            className="imgRight"
            alt="Right-floated"
            src="https://picsum.photos/seed/right/140/100"
          />
          <p>
            This paragraph wraps around an image floated to the right. Lorem
            ipsum dolor sit amet, consectetur adipiscing elit. Donec in neque
            vitae augue facilisis aliquet.
          </p>
          <div className="clearfix" />
        </div>

        <div className="gridDemo mb-2">
          <div className="gridCell">1</div>
          <div className="gridCell">2</div>
          <div className="gridCell">3</div>
          <div className="gridCell">4</div>
          <div className="gridCell">5</div>
          <div className="gridCell">6</div>
        </div>

        <div className="flexCols">
          <div className="flexCell">Column 1</div>
          <div className="flexCell">Column 2</div>
          <div className="flexCell">Column 3</div>
        </div>
      </section>

      {/* ---------------- React Icons sample ---------------- */}
      <section className="mb-4">
        <h3>React Icons — sample</h3>
        <div className="iconsRow">
          <FaStar />
          <FaRocket />
          <FaCode />
          <FaHeart />
          <FaCoffee />
          <FaBook />
        </div>
      </section>

      {/* ---------------- Bootstrap: grids & responsive ---------------- */}
      <section className="mb-4">
        <h3>Bootstrap — Containers & Grids</h3>

        {/* left/right halves */}
        <div className="row mb-2">
          <div className="col-md-6 bg-light p-2">Left half</div>
          <div className="col-md-6 bg-white p-2">Right half</div>
        </div>

        {/* one/two thirds */}
        <div className="row mb-2">
          <div className="col-md-4 bg-white p-2">One third</div>
          <div className="col-md-8 bg-light p-2">Two thirds</div>
        </div>

        {/* side/main */}
        <div className="row mb-2">
          <div className="col-md-3 bg-light p-2">Side</div>
          <div className="col-md-9 bg-white p-2">Main content</div>
        </div>

        {/* Responsive A/B/C/D */}
        <div className="row g-2 mb-2">
          <div className="col-12 col-sm-6 col-md-3">
            <div className="bg-secondary text-white p-2 text-center">A</div>
          </div>
          <div className="col-12 col-sm-6 col-md-3">
            <div className="bg-secondary text-white p-2 text-center">B</div>
          </div>
          <div className="col-12 col-sm-6 col-md-3">
            <div className="bg-secondary text-white p-2 text-center">C</div>
          </div>
          <div className="col-12 col-sm-6 col-md-3">
            <div className="bg-secondary text-white p-2 text-center">D</div>
          </div>
        </div>

        {/* 1..12 columns */}
        <div className="row g-1 mb-2 text-center">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className={`col-${i + 1}`}>
              <div className="bg-light border py-1">{i + 1}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- Bootstrap: tables ---------------- */}
      <section className="mb-4">
        <h3>Bootstrap — Tables</h3>
        <div className="table-responsive mb-2">
          <table className="table table-striped table-bordered align-middle">
            <thead className="table-light">
              <tr>
                <th>Quiz</th>
                <th>Date</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Q1</td>
                <td>06/01/2025</td>
                <td>90</td>
              </tr>
              <tr>
                <td>Q2</td>
                <td>06/08/2025</td>
                <td>92</td>
              </tr>
              <tr>
                <td>Q3</td>
                <td>06/15/2025</td>
                <td>95</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* long columns responsive scroll */}
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead className="table-light">
              <tr>
                <th>Really Long Column A</th>
                <th>Really Long Column B</th>
                <th>Really Long Column C</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                  at urna.
                </td>
                <td>
                  Curabitur blandit tempus porttitor. Vestibulum id ligula porta.
                </td>
                <td>
                  Aenean lacinia bibendum nulla sed consectetur. Maecenas.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ---------------- Bootstrap: lists ---------------- */}
      <section className="mb-4">
        <h3>Bootstrap — Lists</h3>
        <div className="row g-3">
          <div className="col-md-6">
            <h5>Favorite Movies</h5>
            <ul className="list-group">
              <li className="list-group-item">The Matrix</li>
              <li className="list-group-item">Inception</li>
              <li className="list-group-item">Arrival</li>
            </ul>
          </div>
          <div className="col-md-6">
            <h5>Favorite Books (Links)</h5>
            <div className="list-group">
              <a
                className="list-group-item list-group-item-action"
                href="https://en.wikipedia.org/wiki/Clean_Code"
                target="_blank"
                rel="noreferrer"
              >
                Clean Code
              </a>
              <a
                className="list-group-item list-group-item-action"
                href="https://en.wikipedia.org/wiki/Deep_Work"
                target="_blank"
                rel="noreferrer"
              >
                Deep Work
              </a>
              <a
                className="list-group-item list-group-item-action"
                href="https://en.wikipedia.org/wiki/The_Pragmatic_Programmer"
                target="_blank"
                rel="noreferrer"
              >
                The Pragmatic Programmer
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Bootstrap: forms ---------------- */}
      <section className="mb-4">
        <h3>Bootstrap — Forms</h3>

        {/* email + textarea */}
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" placeholder="you@somewhere.com" />
        </div>
        <div className="mb-3">
          <label className="form-label">Message</label>
          <textarea className="form-control" rows={3} placeholder="Say something..." />
        </div>

        {/* dropdown */}
        <div className="mb-3">
          <label className="form-label">Favorite Genre</label>
          <select className="form-select">
            <option>Comedy</option>
            <option>Drama</option>
            <option>Science Fiction</option>
            <option>Fantasy</option>
          </select>
        </div>

        {/* switches */}
        <div className="form-check form-switch mb-3">
          <input className="form-check-input" type="checkbox" id="switch1" defaultChecked />
          <label className="form-check-label" htmlFor="switch1">
            Enable notifications
          </label>
        </div>

        {/* slider */}
        <div className="mb-3">
          <label htmlFor="customRange" className="form-label">Satisfaction</label>
          <input type="range" className="form-range" id="customRange" />
        </div>

        {/* input group / addons */}
        <div className="input-group mb-3">
          <span className="input-group-text">@</span>
          <input type="text" className="form-control" placeholder="username" />
          <span className="input-group-text">.com</span>
        </div>

        {/* responsive form: horizontal on wide, vertical on narrow */}
        <form>
          <div className="row g-2 align-items-center">
            <div className="col-12 col-md-4">
              <label className="form-label">First Name</label>
              <input className="form-control" placeholder="Bo" />
            </div>
            <div className="col-12 col-md-4">
              <label className="form-label">Last Name</label>
              <input className="form-control" placeholder="Gold" />
            </div>
            <div className="col-12 col-md-4">
              <label className="form-label">Role</label>
              <select className="form-select">
                <option>Student</option>
                <option>TA</option>
                <option>Instructor</option>
              </select>
            </div>
          </div>
        </form>
      </section>

      {/* ---------------- Bootstrap: tabs & pills ---------------- */}
      <section className="mb-4">
        <h3>Bootstrap — Tabs & Pills</h3>

        <ul className="nav nav-tabs mb-2">
          <li className="nav-item">
            <button className="nav-link active">Tab 1</button>
          </li>
          <li className="nav-item">
            <button className="nav-link">Tab 2</button>
          </li>
          <li className="nav-item">
            <button className="nav-link">Tab 3</button>
          </li>
        </ul>

        <ul className="nav nav-pills">
          <li className="nav-item"><a className="nav-link" href="#/Labs/Lab1">Lab 1</a></li>
          <li className="nav-item"><a className="nav-link active" href="#/Labs/Lab2">Lab 2</a></li>
          <li className="nav-item"><a className="nav-link" href="#/Kambaz">Kanbas</a></li>
          <li className="nav-item">
            <a className="nav-link" href="https://github.com/goldbo2002/kambaz-react-web-app" target="_blank" rel="noreferrer">
              Git Repo
            </a>
          </li>
        </ul>
      </section>

      {/* ---------------- Bootstrap: card (Starship) ---------------- */}
      <section className="mb-5">
        <h3>Bootstrap — Card</h3>
        <div className="card" style={{ maxWidth: 360 }}>
          <img
            src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg"
            className="card-img-top"
            alt="Starship"
          />
          <div className="card-body">
            <h5 className="card-title">Starship</h5>
            <p className="card-text">
              Stacking Starship card styled as shown.
            </p>
            <a
              className="btn btn-primary"
              href="https://www.spacex.com/vehicles/starship/"
              target="_blank"
              rel="noreferrer"
            >
              Learn more
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
