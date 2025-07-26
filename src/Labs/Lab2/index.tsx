import "./index.css"; // using a CSS file cuz this lab focuses on CSS

export default function Lab2() {
  return (
    <div>
      {/* link to go back home */}
      <a href="/" style={{ marginBottom: 18, display: "inline-block" }}>
        ← Back to Kambaz App
      </a>

      <h2>Trying out CSS stuff (Lab 2)</h2>

      {/* IDs apply to unique elements */}
      <section>
        <h3>Color ID?</h3>
        <p id="crazyWhiteOnRed">ID white text, red bg</p>
        <p id="banana">Black words, yellow banana color bg (id)</p>
      </section>

      {/* Class selectors apply to multiple elements */}
      <section>
        <h3 className="blue-on-yellow">Class: Blue on Yellow</h3>
        <p className="blue-on-yellow">Same styling since it uses same class</p>
      </section>

      {/* Nesting and structure */}
      <section>
        <h3>Nested styling: structure</h3>
        <div id="structureDemoDiv">
          Outer is white-on-red
          <span className="tinyBlueYellow">inner span changes color</span>
        </div>
      </section>

      {/* Foreground colors */}
      <section>
        <h3>Foreground colors</h3>
        <h4 className="bluer">Blue heading</h4>
        <div className="justRed">Red text</div>
        <div className="shrekGreen">Green text</div>
      </section>

      {/* Borders */}
      <section>
        <h3>Border examples</h3>
        <h4 className="whitey">White on blue with border</h4>
        <div className="blackOnRedBox">Black on red with border</div>
        <div className="fatRed">Thick red border</div>
        <div className="blueDashed">Dashed blue border</div>
      </section>

      {/* Padding and margins (spacing) */}
      <section>
        <h3>Padding & Margins</h3>
        <div className="bordered weirdPad yellowbg">crazy padding top/left</div>
        <div className="bordered blueYellowBot">thick bottom padding</div>
        <div className="allSides">big padding all around</div>
        <div className="bordered spacedout">bottom margin to space out</div>
      </section>

      {/* Border radius (rounded corners) */}
      <section>
        <h3>Rounded Corners</h3>
        <div className="radiusDiv tltr">Top left/right rounded</div>
        <div className="radiusDiv blbr">Bottom corners rounded</div>
        <div className="radiusDiv superRound">All corners round</div>
      </section>

      {/* Box sizing */}
      <section>
        <h3>Box sizes</h3>
        <div className="sizeDemo longWide">wider</div>
        <div className="sizeDemo tallishBlue">taller</div>
        <div className="sizeDemo perfectRed">equal height/width</div>
      </section>
    </div>
  );
}
