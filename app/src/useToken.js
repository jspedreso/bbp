import { useState } from "react";

export default function useToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem("token");

    const userToken = tokenString !== "undefined" ? JSON.parse(tokenString) : "";
    return userToken?.token;
  };

  const getUserData = () => {
    const userDataString = localStorage.getItem("userData");
    const userData = userDataString !== "undefined" ? JSON.parse(userDataString) : "";
    return userData?.userData;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (t) => {
    /*    console.log(userToken); */
    localStorage.setItem("token", JSON.stringify(t.token));
    localStorage.setItem("userData", JSON.stringify(t.data));
    setToken(t.token);
  };

  return {
    setToken: saveToken,
    token,
  };
}
