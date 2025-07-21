export default function Lab3() {
  // Messy demo: variables and constants
  let studentName = "Bo Gold";
  const section = "Section 01";
  var legacyVar = 42; // Just for laughs, var sucks!
  let age = 21;
  const PI = 3.14159;

  // Variable types
  let someString: string = "Messy string";
  let someNumber: number = 2049;
  let someBool: boolean = true;
  let untyped;
  untyped = "now I am a string";
  untyped = 22;

  // Boolean variables & if/else/ternary
  let isHungry = false;
  let showWelcome = true;

  // Some conditionals
  let hungryMsg = "";
  if (isHungry) {
    hungryMsg = "Please feed me!";
  } else {
    hungryMsg = "I'm all set, thanks.";
  }

  // Ternary
  let time = 11;
  let greeting = time < 12 ? "Good morning!" : "Good afternoon!";

  return (
    <div style={{ maxWidth: 700, margin: "2rem auto" }}>
      <h2>Lab 3: JS Variables, Types, Conditionals</h2>
      <section>
        <h3>Variables & Constants</h3>
        <ul>
          <li>studentName: {studentName}</li>
          <li>section: {section}</li>
          <li>legacyVar: {legacyVar}</li>
          <li>age: {age}</li>
          <li>PI: {PI}</li>
        </ul>
      </section>

      <section>
        <h3>Variable Types</h3>
        <div>someString: {someString}</div>
        <div>someNumber: {someNumber}</div>
        <div>someBool: {String(someBool)}</div>
        <div>untyped: {untyped}</div>
      </section>

      <section>
        <h3>Booleans & If/Else/Ternary</h3>
        <div>isHungry: {String(isHungry)}</div>
        <div>{hungryMsg}</div>
        <div>Greeting: {greeting}</div>
      </section>
    </div>
  );
}
