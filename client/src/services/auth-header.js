export default function authHeader() {
  const user = localStorage.getItem("accessToken");

  if (user /*&& user.accessToken*/) {
    // for Node.js Express back-end
    return {
      "x-access-token": user,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };
  } else {
    return {};
  }
}
