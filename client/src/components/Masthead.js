import { useState, useEffect } from "react";
import "../App.css";
import Contact from "./Contact";

import Navigation from "./Navigation";
import Pronostico from "./Pronostico";

function Masthead() {
  const [user, setUser] = useState(null);

  // useEffect(() => {
  //   async function tokenAvailable() {
  //     const user = await fetch("http://localhost:3000/user", {
  //       method: "GET",
  //       mode: "cors",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "Access-Control-Allow-Origin": "*",
  //       },
  //     });

  //     const response = await user.json();
  //     setUser(response);
  //   }
  //   tokenAvailable();
  // }, []);

  return (
    <>
      <Navigation />
      <header className="masthead">
        <div className="container px-4 px-lg-5 h-100">
          <div className="row gx-4 gx-lg-5 h-100 align-items-center justify-content-center text-center">
            <div className="col-lg-8 align-self-end">
              <h1 className="text-white font-weight-bold">PR</h1>
              <hr className="divider" />
            </div>
            <div className="col-lg-8 align-self-baseline">
              <p className="text-white-75 mb-5">
                Start Bootstrap can help you build better websites using the
                Bootstrap framework! Just download a theme and start
                customizing, no strings attached!
              </p>
              <a className="btn btn-primary btn-xl" /*href="#about"*/>
                Find Out More
              </a>
            </div>
          </div>
        </div>
        <Contact />
      </header>
      {/* <Navigation /> */}
      {/* <Pronostico /> */}
    </>
  );
}

export default Masthead;
