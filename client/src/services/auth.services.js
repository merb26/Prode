import axios from "axios";
import TokenServices from "./token.services";

const API_URL = "http://localhost:3000/";

const login = async (email, password) => {
  // const fetchData = await fetch(API_URL + "signin", {
  //   method: "POST",
  //   mode: "cors",
  //   headers: {
  //     "Content-Type": "application/json",
  //     "Access-Control-Allow-Origin": "*",
  //   },
  //   credentials: "same-origin",
  //   body: JSON.stringify({
  //     email,
  //     password,
  //   }),
  // });

  const response = await axios.post(API_URL + "signin", { email, password });

  if (response) {
    //localStorage.setItem("accessToken", response.accessToken);
    TokenServices.setUser(response.data.accessToken);
  }

  return response.data;
};

const authServices = { login };

export default authServices;
