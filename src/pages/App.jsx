import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Verifier from "./Verifier";

function App() {
  return (
    <Router basename="/MYLINKLOCK">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/verifier" element={<Verifier />} />
      </Routes>
    </Router>
  );
}

export default App;
