import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function Registration() {
  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const [sector, setSector] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const signUp = await fetch("http://localhost:3000/signup", {
        method: "POST",
        made: "cors",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ name, lastname, sector, email, password }),
      });
      const response = await signUp.json();
      console.log(response);
      console.log(typeof response);
      if (!response.used) {
        console.log("usuario nuevo");
        navigate("/suscripcion", {
          state: { name, lastname, sector, email, password },
        });
      } else {
        window.alert(`Email en uso`);
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <div className="container px-4 px-lg-5">
      <div className="row gx-4 gx-lg-5 justify-content-center">
        <div className="col-lg-8 col-xl-6 text-center">
          <h2 className="mt-0">REGISTRO</h2>
          <hr className="divider" />
          <p className="text-muted mb-5">
            Registrate para poder acceder a la plataforma de pago y participar
            del PRODE
          </p>
        </div>
      </div>
      <div className="row gx-4 gx-lg-5 justify-content-center mb-5">
        <div className="col-lg-6">
          <form id="contactForm">
            {/* <!-- Name input--> */}
            <div className="form-floating mb-3">
              <input
                className="form-control"
                id="name"
                type="text"
                placeholder="Enter your name..."
                data-sb-validations="required"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label for="name">Nombre</label>
              <div
                className="invalid-feedback"
                data-sb-feedback="name:required"
              >
                A name is required.
              </div>
            </div>
            <div className="form-floating mb-3">
              <input
                className="form-control"
                id="lastname"
                type="text"
                placeholder="Enter your lastname..."
                data-sb-validations="required"
                value={lastname}
                onChange={(e) => setLastName(e.target.value)}
              />
              <label for="lastname">Apellido</label>
              <div
                className="invalid-feedback"
                data-sb-feedback="name:required"
              >
                A name is required.
              </div>
            </div>
            <div className="form-floating mb-3">
              <input
                className="form-control"
                id="sector"
                type="text"
                placeholder="Enter your sector..."
                data-sb-validations="required"
                value={sector}
                onChange={(e) => setSector(e.target.value)}
              />
              <label for="sector">Sector</label>
              <div
                className="invalid-feedback"
                data-sb-feedback="name:required"
              >
                A sector is required.
              </div>
            </div>
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
              <label for="email">Email</label>
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
              <label for="password">Contraseña</label>
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
                Registrarse
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
