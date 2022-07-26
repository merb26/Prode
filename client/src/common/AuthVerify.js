import React from "react";
import { useNavigate } from "react-router-dom";
import TokenServices from "../services/token.services";

const parseJwt = (token) => {
  try {
    console.log(window.atob(token.split(".")[1]).exp);
    return JSON.parse(window.atob(token.split(".")[1]));
  } catch (error) {
    return null;
  }
};

const AuthVerify = (props) => {
  const navigate = useNavigate();

  const user = TokenServices.getLocalAccessToken(); //localStorage.getItem("user");
  if (user) {
    const decodedJwt = parseJwt(user);
    console.log(decodedJwt.exp * 1000 < Date.now());
    if (decodedJwt.exp * 1000 < Date.now()) {
      //props.logout();
      TokenServices.removeUser();
      //localStorage.removeItem("user");
      navigate("/login");
    }
  }
};

export default AuthVerify;
