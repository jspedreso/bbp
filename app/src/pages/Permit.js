import React from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import PermitList from "../components/permits/PermitList";

const queryClient = new QueryClient();

const Permit = () => (
  <QueryClientProvider client={queryClient}>
    <PermitList />
  </QueryClientProvider>
);

export default Permit;
