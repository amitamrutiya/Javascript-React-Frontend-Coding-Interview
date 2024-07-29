import { useState } from "react";

function App() {
  const arr = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "0",
    "+",
    "-",
    "/",
    "*",
    "=",
    "C",
    ".",
    "(",
    ")",
    "√",
    "%",
    "←",
  ];
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleClick = (e) => {
    const id = e.target.id;
    if (id === "C") {
      setValue("");
    } else if (id === "=") {
      handleSubmit();
    } else if (id === "←") {
      setValue((val) => val.slice(0, -1));
    } else if (id === "√") {
      setValue((val) => val + "Math.sqrt(");
    } else if (id === "%") {
      setValue((val) => val + "/100");
    } else {
      setValue((val) => val + id);
    }
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    try {
      const ans = eval(value.replace(/√/g, "Math.sqrt"));
      setValue(ans);
    } catch (err) {
      alert("Invalid Inputs");
    }
  };

  return (
    <div className="App">
      <h1>Calculator</h1>

      <form onSubmit={handleSubmit}>
        <input value={value} onChange={handleChange} type="text" />
      </form>

      <div className="container" onClick={handleClick}>
        {arr.map((item, idx) => (
          <button id={item} key={idx} className="cell">
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
