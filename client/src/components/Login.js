import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "../App.css";
import authHeader from "../services/auth-header";
import authServices from "../services/auth.services";
import axios from "axios";

export default function Login() {
  const [user, setUser] = useState(null);

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

  async function tokenAvailable(token) {
    //const header = authHeader();
    // const user = await fetch("http://localhost:3000/user", {
    //   method: "GET",
    //   mode: "cors",
    //   headers: authHeader(),
    //   // headers: {
    //   //   "x-access-token": token,
    //   // },
    //   credentials: "same-origin",
    // });

    const user = await axios.get("http://localhost:3000/user", {
      headers: authHeader(),
    });

    const response = await user;
    setUser(response.data);
    console.log(response);
    return response.data;
  }
  //tokenAvailable();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //POST to /signin
      const data = await authServices.login(email, password);

      if (data.isLogged && data.suscripcion === true && data.token) {
        await tokenAvailable(data.token);
        //console.log(localStorage.getItem("user"));
        //localStorage.token ? tokenAvailable() : console.log("NO HAY TOKEN");
        //navigate(`/masthead/${email}&${data.isLogged}&${data.id}`);
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
    <div>
      <form>
        <label>Email</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleSubmit}>Login</button>
      </form>
    </div>
  );
}
