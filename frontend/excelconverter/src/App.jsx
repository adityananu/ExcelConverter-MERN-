import { Routes, Route } from "react-router-dom";
import "./App.css";
import AddNames from "./pages/AddNames";
import Home from "./pages/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/addnames" element={<AddNames />} />
    </Routes>
  );
}

export default App;
