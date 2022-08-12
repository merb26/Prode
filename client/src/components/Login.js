import { useEffect, useState } from "react";
import { useNavigate, useSearchParams, Navigate } from "react-router-dom";
import "../App.css";
import authServices from "../services/auth.services";
import axios from "axios";
import api from "../services/api";
import UserService from "../services/user.services";

export default function Login() {
  const [user, setUser] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [getParams] = useSearchParams();
  const payment_id = getParams.get("payment_id");
  const status = getParams.get("status");
  const preference_id = getParams.get("preference_id");

  useEffect(() => {
    async function notify() {
      if (payment_id && status === "approved") {
        try {
          const post = await fetch("http://localhost:3000/notify", {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
              payment_id,
              preference_id,
            }),
          });
        } catch (error) {
          console.log(error.message);
        }
      }
    }
    notify();
  }, []);

  async function tokenAvailable() {
    const userLogged = await UserService.getUserLogged();

    setUser(await userLogged.data);
    //console.log(userLogged.data);
    return userLogged.data;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //POST to /signin
      const data = await authServices.login(email, password);

      if (data.isLogged && data.suscripcion === true && data.accessToken) {
        //const loged = await tokenAvailable();
        navigate(`/masthead`, { state: { /*token: loged, */ id: data.id } });
      } else if (data.isLogged && data.suscripcion === false) {
        navigate("/suscripcion", {
          state: { preference_id: data.preference_id },
        });
      } else {
        window.alert("Invalid Login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container px-4 px-lg-5">
      <div className="row gx-4 gx-lg-5 justify-content-center">
        <div className="col-lg-8 col-xl-6 text-center">
          <h2 className="mt-0">LOGIN</h2>
          <hr className="divider" />
          <p className="text-muted mb-5">
            Inicie sesión para poder ver sus resultados del PRODE
          </p>
        </div>
      </div>
      <div className="row gx-4 gx-lg-5 justify-content-center mb-5">
        <div className="col-lg-6">
          <form id="contactForm">
            {/* <!-- Email address input--> */}
            <div className="form-floating mb-3">
              <input
                className="form-control"
                id="email"
                type="email"
                placeholder="name@example.com"
                data-sb-validations="required,email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="email">Email</label>
            </div>
            {/* <!-- Phone number input--> */}
            <div className="form-floating mb-3">
              <input
                className="form-control"
                id="phone"
                type="password"
                value={password}
                placeholder="Password"
                data-sb-validations="required"
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="password">Contraseña</label>
              <div
                className="invalid-feedback"
                data-sb-feedback="phone:required"
              >
                A password is required.
              </div>
            </div>
            {/* <!-- Message input--> */}

            <div className="d-none" id="submitSuccessMessage">
              <div className="text-center mb-3">
                <div className="fw-bolder">Form submission successful!</div>
                To activate this form, sign up at
                <br />
              </div>
            </div>

            <div className="d-none" id="submitErrorMessage">
              <div className="text-center text-danger mb-3">
                Error sending message!
              </div>
            </div>
            {/* <!-- Submit Button--> */}
            <div className="d-grid">
              <button
                className="btn btn-primary btn-xl"
                id="submitButton"
                type="submit"
                onClick={handleSubmit}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
