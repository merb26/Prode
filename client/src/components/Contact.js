import { useContext, useState } from "react";
import "../App.css";
import axios from "axios";
import AuthVerify from "../common/AuthVerify";
import { UserContext } from "./Context";
import Navigation from "./Navigation";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [textarea, setTextTarea] = useState("");

  const userLogged = AuthVerify();

  const { getImg, groupMatches } = useContext(UserContext);
  console.log(getImg);
  const handleSubmit = async () => {
    const response = await axios.post("/contact", {
      name,
      email,
      phone,
      textarea,
    });

    if (response) {
      console.log("Contacto Enviado");
    }
  };
  return (
    userLogged && (
      <>
        <Navigation />
        {/* <section className="page-section" id="contact"> */}
        <div className="container px-4 px-lg-5">
          <div className="row gx-4 gx-lg-5 justify-content-center">
            <div className="col-lg-8 col-xl-6 text-center">
              <h2 className="mt-0">Let's Get In Touch!</h2>
              <hr className="divider" />
              <p className="text-muted mb-5">
                Por cualquier consulta o reclamo, por favor contactanos!
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
                    value={name}
                    placeholder="Enter your name..."
                    data-sb-validations="required"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                  <label htmlFor="name">Nombre y Apellido</label>
                  <div
                    className="invalid-feedback"
                    data-sb-feedback="name:required"
                  >
                    A name is required.
                  </div>
                </div>
                {/* <!-- Email address input--> */}
                <div className="form-floating mb-3">
                  <input
                    className="form-control"
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    data-sb-validations="required,email"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                  <label htmlFor="email">Email</label>
                </div>
                {/* <!-- Phone number input--> */}
                <div className="form-floating mb-3">
                  <input
                    className="form-control"
                    id="phone"
                    type="tel"
                    placeholder="(123) 456-7890"
                    value={phone}
                    data-sb-validations="required"
                    onChange={(e) => {
                      setPhone(e.target.value);
                    }}
                  />
                  <label htmlFor="phone">Teléfono</label>
                  <div
                    className="invalid-feedback"
                    data-sb-feedback="phone:required"
                  >
                    A phone number is required.
                  </div>
                </div>
                {/* <!-- Message input--> */}
                <div className="form-floating mb-3">
                  <textarea
                    className="form-control"
                    value={textarea}
                    onChange={(e) => setTextTarea(e.target.value)}
                  ></textarea>
                  <label htmlFor="message">Mensaje</label>
                  <div
                    className="invalid-feedback"
                    data-sb-feedback="message:required"
                  >
                    A message is required.
                  </div>
                </div>

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
                    className="btn btn-primary btn-xl disabled"
                    id="submitButton"
                    type="submit"
                  >
                    Enviar
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="row gx-4 gx-lg-5 justify-content-center">
            <div className="col-lg-4 text-center mb-5 mb-lg-0">
              <i className="bi-phone fs-2 mb-3 text-muted"></i>
              <div>+54 (341) 211-4101</div>
            </div>
          </div>
        </div>
        {/* </section> */}
      </>
    )
  );
}
