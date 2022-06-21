import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "../App.css";

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

  async function tokenAvailable() {
    const user = await fetch("http://localhost:3000/user", {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      credentials: "same-origin",
    });

    const response = await user.json();
    setUser(await response);
    console.log(await response);
    return response;
  }
  //tokenAvailable();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/signin", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        credentials: "same-origin",
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await response.json();
      console.log(data);

      if (data.isLogged && data.suscripcion === true && data.token) {
        localStorage.setItem("token", data.token);

        //localStorage.token ? tokenAvailable() : console.log("NO HAY TOKEN");
        await tokenAvailable();

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
