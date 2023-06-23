import Home from "./pages/Home";

import Permit from "./pages/Permit";
import Report from "./pages/Report";
import Users from "./pages/User";

import PermitLayout from "./components/permits/PermitLayout";
import UserLayout from "./components/users/UserLayout";

const routes = [
  { path: "/", element: <Home /> },
  { path: "/permit", element: <Permit />, children: [{ path: "form", element: <PermitLayout /> }] },
  { path: "/report", element: <Report /> },
  { path: "/user", element: <Users /> },
  { path: "/permitForm", element: <PermitLayout /> },
  { path: "/userForm", element: <UserLayout /> },
];
export default routes;
