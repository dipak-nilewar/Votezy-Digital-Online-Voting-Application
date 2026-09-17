 import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Candidates from "./pages/Candidates";
import Voters from "./pages/Voters";
import Vote from "./pages/Vote";
import Results from "./pages/Results";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route
          path="/candidates"
          element={<Candidates />}
        />

        <Route
          path="/voters"
          element={<Voters />}
        />

        <Route
          path="/vote"
          element={<Vote />}
        />

        <Route
          path="/results"
          element={<Results />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;