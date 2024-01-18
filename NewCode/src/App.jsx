import { Route, Routes } from "react-router-dom";
import NoPage from "./Components/404/NoPage";
import Home from "./Components/Home/Home";
import Header from "./Components/Header/Header";
import "./App.css";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="*" element={<NoPage></NoPage>} />
      </Routes>
    </div>
  );
}

export default App;
