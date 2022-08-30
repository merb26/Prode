import "../App.css";
import { Link, useNavigate } from "react-router-dom";
import TokenServices from "../services/token.services";

function Navigation({ id, groupMatches, teams, getImg, userInfo }) {
  const userLogged = TokenServices.getLocalAccessToken; //localStorage.getItem("accessToken");
  const navigate = useNavigate();

  const handleLogOut = () => {
    TokenServices.removeUser();
    //localStorage.removeItem("accessToken");
    navigate("/login");
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-light fixed-top py-3"
        id="mainNav"
      >
        <div className="container px-4 px-lg-5">
          <a className="navbar-brand" /*href="#page-top"*/>
            {userInfo.name} {userInfo.lastname}
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
                <Link
                  to="/resultados"
                  state={{
                    id,
                    groupMatches,
                    teams,
                    getImg,
                  }}
                >
                  <a className="nav-link" /*href="#services"*/>Resultados</a>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/fechas"
                  state={{
                    id,
                    groupMatches,
                    teams,
                    getImg,
                  }}
                >
                  <a className="nav-link" /*href="#portfolio"*/>Fechas</a>
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" /*href="#contact"*/>Contacto</a>
              </li>

              <li className="nav-item">
                <Link
                  to="/pronosticos"
                  state={{
                    id,
                    groupMatches,
                    teams,
                    getImg,
                  }}
                >
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
