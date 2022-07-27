import axios from "axios";
import TokenServices from "./token.services";
import api from "./api";

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

  const response = await api.post("/signin", { email, password });

  if (response) {
    //localStorage.setItem("accessToken", response.accessToken);
    TokenServices.setUser(response.data.accessToken);
  }

  return response.data;
};

const signup = async (names, lastname, sector, email, password) => {
  const signUp = await api.post("/signup", {
    names,
    lastname,
    sector,
    email,
    password,
  });

  return signUp;
};

const authServices = { login, signup };

export default authServices;
