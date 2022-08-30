import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Masthead from "./components/Masthead";
import Resultados from "./components/Resultados";
import Registration from "./components/Registration";
import Login from "./components/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Pronostico from "./components/Pronostico";
import Suscripcion from "./components/Suscripcion";
import Fechas from "./components/Fechas";

function App() {
  return (
    <>
      <div id="page-top">
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route exact path={`/`} element={<Masthead />} />
            <Route exact path="/resultados" element={<Resultados />} />
            <Route exact path="/registro" element={<Registration />} />
            <Route exact path="/suscripcion" element={<Suscripcion />} />
            <Route exact path="/fechas" element={<Fechas />} />
            <Route exact path="/pronosticos" element={<Pronostico />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
