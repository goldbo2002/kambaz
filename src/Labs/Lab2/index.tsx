import "./index.css";

export default function Lab2() {
  return (
    <div>
      <h2>Trying out a bunch of CSS stuff (Lab 2)</h2>

      {/*id slectors*/}
      <section>
        <h3>Color IDs - Why not?</h3>
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
        <h3>Nested styling: structure experiment</h3>
        <div id="structureDemoDiv">
          This whole box is white on red.  
          <span className="tinyBlueYellow">But this part goes blue/yellow.</span>
        </div>
      </section>

      <section>
        <h3>Color me foreground</h3>
        <h4 className="bluer">Heading is blue on white</h4>
        <div className="justRed">Trying a red on white text here, why not</div>
        <div className="shrekGreen">Green text on white, for fun</div>
      </section>

      <section>
        <h3>BG + Border stuff</h3>
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
        <h3>Padding & Margins (where’s my whitespace)</h3>
        <div className="bordered weirdPad yellowbg">Super fat red border, yellow, crazy top/left padding</div>
        <div className="bordered blueYellowBot">Blue border, yellow bg, thick bottom padding only</div>
        <div className="allSides">Yellow border, blue bg, big all around padding</div>
        <div className="bordered spacedout">Red border, yellow bg, margin on bottom for air</div>
        <div className="centeredBox">Blue border, yellow bg, why not center this?</div>
        <div className="bigMarginBox">Yellow border, blue bg, huge margins everywhere</div>
      </section>

      <section>
        <h3>Rounded Corners, but not too round</h3>
        <div className="radiusDiv tltr">Just the top left/right corners</div>
        <div className="radiusDiv blbr">Bottom left/right, so round</div>
        <div className="radiusDiv superRound">Go wild, all corners</div>
        <div className="radiusDiv notTopRight">Skip top right for fun</div>
      </section>

      <section>
        <h3>How big can it get?</h3>
        <div className="sizeDemo longWide">Yellow, wider than tall</div>
        <div className="sizeDemo tallishBlue">Blue, much taller</div>
        <div className="sizeDemo perfectRed">Red, equal height/width</div>
      </section>


      <section>
        <h3>Positioning: relative chaos</h3>
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
          This text wraps around the pic. That’s the float!
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
        <h3>Just some icons (React Icons, see code)</h3>
        <div className="iconsFlex">
          <span role="img" aria-label="house">🏠</span>
          <span role="img" aria-label="star">⭐</span>
          <span role="img" aria-label="book">📚</span>
          <span role="img" aria-label="rocket">🚀</span>
          <span role="img" aria-label="mail">📧</span>
          <span role="img" aria-label="check">✅</span>
        </div>
      </section>
    </div>
  );
}
