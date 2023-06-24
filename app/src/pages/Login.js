import React from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import LoginForm from "../components/login/LoginForm";

const queryClient = new QueryClient();

const Login = ({ setToken }) => (
  <QueryClientProvider client={queryClient}>
    <LoginForm setToken={setToken} />
  </QueryClientProvider>
);

export default Login;
