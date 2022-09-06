import React from "react"
import { useNavigate } from "react-router-dom"
import TokenServices from "../services/token.services"

const parseJwt = token => {
  try {
    return JSON.parse(window.atob(token.split(".")[1]))
  } catch (error) {
    return null
  }
}

const AuthVerify = props => {
  // const navigate = useNavigate();

  // const user = TokenServices.getLocalAccessToken(); //localStorage.getItem("user");
  // if (user) {
  //   const decodedJwt = parseJwt(user);

  //   if (decodedJwt.exp * 1000 < Date.now()) {
  //     TokenServices.removeUser();

  //     navigate("/login");
  //     return decodedJwt;
  //   }
  //   return decodedJwt;
  // }
  return true
}

export default AuthVerify
