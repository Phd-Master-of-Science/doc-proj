import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Navbar } from "./modules/shared/Navbar";
import { Routing } from "./Routing";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
      </div>
      <Routing />
    </Router>
  );
};

export default App;
