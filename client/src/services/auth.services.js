const API_URL = "http://localhost:3000/";

const login = async (email, password) => {
  const fetchData = await fetch(API_URL + "signin", {
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

  const response = await fetchData.json();

  console.log(response);

  if (response) {
    localStorage.setItem("user", response.token);
  }

  return response;
};

const authServices = { login };

export default authServices;
