import * as React from "react";
import Box from "@mui/material/Box";
import Header from "./Header";
import SideBarLayout from "./SidebarLayout";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Header></Header>
      <SideBarLayout></SideBarLayout>
      <Outlet></Outlet>
      <Box component='main' sx={{ flexGrow: 1, p: 5, pl: 40, mt: 5, ml: 30 }}></Box>
    </Box>
  );
};

export default MainLayout;
