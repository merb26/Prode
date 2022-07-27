import axios from "axios";
import TokenService from "./token.services";

//Create an instance of AXIOS

const instance = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

//INTERCEPTION OF REQUEST

instance.interceptors.request.use(
  (config) => {
    const token = TokenService.getLocalAccessToken("user");
    //console.log("TOEKN", token);
    if (token) {
      config.headers["x-access-token"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//INTERCEPTION OF RESPONSE

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = await err.config;

    if (originalConfig.url !== "/signin" && err.response) {
      //Access Token expired

      //use a flag call _retry on original Request (config) to handle Infinite loop. It is the case that request is failed again, and the server continue to return 401 status code.
      if (err.response.status === 401 && originalConfig._retry) {
        originalConfig._retry = true;
        try {
          const rs = await instance.post("/refreshtoken", {
            refreshToken: TokenService.getLocalRefreshToken(),
          });
          const { accessToken } = rs.data;
          TokenService.updateLocalAccessToken(accessToken);
          return instance(originalConfig);
        } catch (_err) {
          return Promise.reject(_err);
        }
      }
    }
    return Promise.reject(err);
  }
);

export default instance;
