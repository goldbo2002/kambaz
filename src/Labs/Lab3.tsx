import { useState } from "react";

// Simple TodoItem component
function TodoItem({ todo, onDelete }) {
  return (
    <li style={{ margin: "0.4em 0", display: "flex", justifyContent: "space-between" }}>
      <span>{todo.text}</span>
      <button onClick={onDelete}>X</button>
    </li>
  );
}

// Simple TodoList component using state
function TodoDemo() {
  const [todos, setTodos] = useState([
    { text: "Finish this assignment" },
    { text: "Push to GitHub" },
    { text: "Eat lunch" }
  ]);
  const [newTodo, setNewTodo] = useState("");

  return (
    <div>
      <input
        value={newTodo}
        placeholder="Add a task"
        onChange={e => setNewTodo(e.target.value)}
        style={{ marginRight: 8 }}
      />
      <button
        onClick={() => {
          setTodos([...todos, { text: newTodo }]);
          setNewTodo("");
        }}
        disabled={!newTodo.trim()}
      >
        Add
      </button>
      <ul>
        {todos.map((todo, i) =>
          <TodoItem
            key={i}
            todo={todo}
            onDelete={() => setTodos(todos.filter((_, idx) => idx !== i))}
          />
        )}
      </ul>
    </div>
  );
}

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
            <section>
        <h3>Functions: ES5, ES6, Implied Returns</h3>
        <div>
          <strong>Legacy ES5:</strong>{" "}
          {function legacyHello(name) {
            return "Hello from ES5, " + name + "!";
          }("Bo")}
        </div>
        <div>
          <strong>ES6 Arrow:</strong>{" "}
          {((name) => `Hey ${name}, this is ES6!`)("Gold")}
        </div>
        <div>
          <strong>Implied Return:</strong>{" "}
          {((n) => n * 2)(11)}
        </div>
        <div>
          <strong>Template Literals:</strong>{" "}
          {`Bo's lucky number is ${42 + 1}`}
        </div>
      </section>

      <section>
        <h3>Arrays & Array Methods</h3>
        {(() => {
          let nums = [2, 4, 7, 11];
          let friends = ["Jim", "Pam", "Dwight"];
          return (
            <div>
              <div>nums: {JSON.stringify(nums)}</div>
              <div>friends: {friends.join(", ")}</div>
              <div>nums[2]: {nums[2]}</div>
              <div>nums length: {nums.length}</div>
              <div>
                Add: {[...nums, 99].join(", ")}
                <br />
                Remove: {nums.slice(0, nums.length - 1).join(", ")}
              </div>
              <div>
                For Loop: [
                {nums.map((n, i) =>
                  <span key={i}>{n * 2}{i < nums.length - 1 ? ", " : ""}</span>
                )}]
              </div>
              <div>
                Map: [{nums.map(n => n + 1).join(", ")}]
              </div>
              <div>
                Find: {nums.find(n => n > 5)}
              </div>
              <div>
                FindIndex: {nums.findIndex(n => n === 7)}
              </div>
              <div>
                Filter (&gt;5): [{nums.filter(n => n > 5).join(", ")}]
              </div>
            </div>
          );
        })()}
      </section>
      <section>
        <h3>JSON & Objects</h3>
        {(() => {
          const user = {
            id: 1,
            name: "Bo Gold",
            section: "01",
            isProcrastinating: true
          };
          const userJson = JSON.stringify(user);
          return (
            <div>
              <div>JS Object: {user.name} (Section {user.section})</div>
              <div>JSON: {userJson}</div>
            </div>
          );
        })()}
      </section>

      <section>
        <h3>Spread & Destructuring</h3>
        {(() => {
          const arr = [1, 2, 3];
          const arrCopy = [...arr, 4, 5];
          const { name, ...rest } = { name: "Bo", age: 99, best: true };

          function messyFunc({ age, best }) {
            return `age: ${age}, best: ${best ? "obviously" : "nope"}`;
          }

          return (
            <div>
              <div>Spread: [{arrCopy.join(", ")}]</div>
              <div>Destructured name: {name}, rest: {JSON.stringify(rest)}</div>
              <div>Func Destructuring: {messyFunc({ age: 21, best: false })}</div>
            </div>
          );
        })()}
      </section>

      <section>
        <h3>ToDo List with React</h3>
        <TodoDemo />
      </section>

    </div>
  );
}
