import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Info from "./Info";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<Info />} />
      </Routes>
    </div>
  );
};

export default App;
