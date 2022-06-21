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

function App() {
  const [user, setUser] = useState(null);

  return (
    <body id="page-top">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            exact
            path={`/masthead/:user&:isLogged&:id`}
            element={<Masthead />}
          />
          <Route exact path="/resultados" element={<Resultados />} />
          <Route exact path="/registro" element={<Registration />} />
          <Route exact path="/suscripcion" element={<Suscripcion />} />
        </Routes>
      </Router>

      {/* <Masthead />
      <Navigation /> */}

      {/* <Registration /> */}
      {/* <Login /> */}
      {/*<Contact /> */}
      {/* <Pronostico /> */}
    </body>
  );
}

export default App;
