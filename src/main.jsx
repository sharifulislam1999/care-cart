import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import Routes from "./Router/Routes/Route";
import MyContext from "./AuthProvider/AuthProvder";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <div className="font-roboto">
      <MyContext>
        <RouterProvider router={Routes}></RouterProvider>
      </MyContext>
    </div>
    </QueryClientProvider>
   
  </React.StrictMode>
);
