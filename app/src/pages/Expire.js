import React from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import ExpireList from "../components/expiration/ExpireList";

const queryClient = new QueryClient();

const Expire = () => (
  <QueryClientProvider client={queryClient} contextSharing={true}>
    <ExpireList />
  </QueryClientProvider>
);

export default Expire;
