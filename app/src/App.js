import "./App.css";
import React, { useState, createContext } from "react";
/* import { Route, Routes } from "react-router"; */
import MainLayout from "./components/layout/MainLayout";
import routes from "./routes";
import { useRoutes, redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import useToken from "./useToken";

const TokenContext = createContext();
/* const setToken = (userToken) => {
  sessionStorage.setItem("token", JSON.stringify(userToken));
}; */

const App = () => {
  const { token, setToken } = useToken();
  const localtoken = localStorage.getItem("token");
  const content = useRoutes(routes());
  if (!localtoken) {
    if (!token) {
      /*  return redirect("/login"); */
      return (
        <>
          <ToastContainer position='top-right' autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme='light' />
          <ToastContainer />
          <Login setToken={setToken} />
        </>
      );
    } else {
      return (
        <>
          <ToastContainer position='top-right' autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme='light' />
          <ToastContainer />
          <MainLayout></MainLayout>
          {content}
        </>
      );
    }
  } else {
    return (
      <>
        <ToastContainer position='top-right' autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme='light' />
        <ToastContainer />
        <MainLayout></MainLayout>
        {content}
      </>
    );
  }
};

export default App;
