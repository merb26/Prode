import "../App.css";
import { Link, useNavigate } from "react-router-dom";
import TokenServices from "../services/token.services";
import { useContext } from "react";
import { UserContext } from "./Context";
import AuthVerify from "../common/AuthVerify";

function Navigation() {
  const userLogged = AuthVerify(); //localStorage.getItem("accessToken");
  console.log("USERLOGGED", userLogged);
  const navigate = useNavigate();

  const handleLogOut = () => {
    TokenServices.removeUser();
    navigate("/login");
  };

  const { id, teams, groupMatches, getImg } = useContext(UserContext);
  console.log("CONTEXT_NAV", useContext(UserContext));

  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-light fixed-top py-3"
        id="mainNav"
      >
        <div className="container px-4 px-lg-5">
          <a className="navbar-brand" /*href="#page-top"*/>
            {userLogged.name} {userLogged.lastname}
          </a>
          <button
            className="navbar-toggler navbar-toggler-right"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ms-auto my-2 my-lg-0">
              <li className="nav-item">
                <Link to="/">
                  <a className="nav-link" /*href="#services"*/>Home</a>
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" /*href="#about"*/>Reglas</a>
              </li>
              <li className="nav-item">
                <Link to="/resultados">
                  <a className="nav-link" /*href="#services"*/>Resultados</a>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/fechas">
                  <a className="nav-link" /*href="#portfolio"*/>Fechas</a>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/contacto">
                  <a className="nav-link" /*href="#contact"*/>Contacto</a>
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/pronosticos">
                  <a className="nav-link" /*href="#services"*/>Pronosticos</a>
                </Link>
              </li>
              <li className="nav-item">
                {userLogged ? (
                  <a className="nav-link" onClick={handleLogOut}>
                    Logout
                  </a>
                ) : (
                  <a className="nav-link" href="#registro">
                    Registro
                  </a>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navigation;
