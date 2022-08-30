import api from "./api";

const getUserLogged = () => {
  return api.get("/user");
};

const getAllUsers = () => {
  return api.get("/allusers");
};

const UserService = {
  getUserLogged,
  getAllUsers,
};

export default UserService;
