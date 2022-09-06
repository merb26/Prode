import api from "./api";

const getUserLogged = () => {
  return api.get("/user");
};

const UserService = {
  getUserLogged,
};

export default UserService;
