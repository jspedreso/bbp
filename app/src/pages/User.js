import React from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import UserList from "../components/users/UserList";

const queryClient = new QueryClient();

const User = () => (
  <QueryClientProvider client={queryClient}>
    <UserList />
  </QueryClientProvider>
);

export default User;
