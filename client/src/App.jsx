import { EthProvider } from "./contexts/EthContext";

import Demo from "./components/Demo";

const App = () => {
  return (
    <EthProvider>
      <div id="App">
        <div className="container">
          <hr />
          <Demo />
          <hr />
        </div>
      </div>
    </EthProvider>
  );
}

export default App;
