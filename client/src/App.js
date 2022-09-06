import "./App.css";
import Navigation from "./components/Navigation";
import Masthead from "./components/Masthead";
import Resultados from "./components/Resultados";
import Registration from "./components/Registration";
import Login from "./components/Login";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
} from "react-router-dom";
import Contact from "./components/Contact";
import Pronostico from "./components/Pronostico";

import "bootstrap/dist/css/bootstrap.min.css";
import Suscripcion from "./components/Suscripcion";
import { useState } from "react";
import Fechas from "./components/Fechas";

function App() {
  const [user, setUser] = useState(null);

  return (
    <>
      <div id="page-top">
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route exact path={`/masthead`} element={<Masthead />} />
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
