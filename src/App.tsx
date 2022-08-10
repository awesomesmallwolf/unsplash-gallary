import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { Home } from "./component/home";

function App() {
  return (
    <section className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/photos" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </section>
  );
}

export default App;
