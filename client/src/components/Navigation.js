import "../App.css";
import Masthead from "./Masthead";
import Registration from "./Registration";

function Navigation() {
  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-light fixed-top py-3"
        id="mainNav"
      >
        <div className="container px-4 px-lg-5">
          <a className="navbar-brand" /*href="#page-top"*/>PRODE SECCO</a>
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
                <a className="nav-link" /*href="#about"*/>Reglas</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" /*href="#services"*/>Resultados</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" /*href="#portfolio"*/>Fechas</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" /*href="#contact"*/>Contacto</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#registro">
                  Registro
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navigation;
