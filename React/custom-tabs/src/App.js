import Tabs from "./component/Tabs";

function App() {
  return (
    <div className="App">
      <h1>Custom Tabs</h1>
      {/* classname, disable  */}
      <Tabs>
        <div title="Home">
          <h1>Tab content for Home</h1>
        </div>
        <div title="About">
          <h2> Tab content for About</h2>
        </div>
        <div title="Contact">
          <h3>Tab content for Contact</h3>
        </div>
      </Tabs>
    </div>
  );
}

export default App;
