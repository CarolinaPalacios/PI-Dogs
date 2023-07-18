import { Route, Routes, useLocation } from "react-router-dom";
import { LandingPage, HomePage, DetailPage, FormPage } from "./views";
import NavBar from "./components/NavBar/NavBar";
import "./App.css";

function App() {
  const location = useLocation();

  return (
    <div className="App">
      {location.pathname !== "/" && <NavBar />}
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/detail/:id" element={<DetailPage />} />
        <Route path="/create" element={<FormPage />} />
      </Routes>
    </div>
  );
}

export default App;
