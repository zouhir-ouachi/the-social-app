import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Query } from "appwrite";
import React, { ReactNode } from "react";

const aueryClient = new QueryClient();
export const QueryProvider = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={aueryClient}>{children}</QueryClientProvider>
  );
};
