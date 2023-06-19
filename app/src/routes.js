import Home from "./pages/Home";
import Permit from "./pages/Permit";
import Report from "./pages/Report";
import Users from "./pages/User";
import Expiration from "./pages/Expire";
import Login from "./pages/Login";
import useToken from "./useToken";
const routes = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return [
      { path: "/", element: <Home /> },
      { path: "/permit", element: <Permit /> },
      { path: "/report", element: <Report /> },
      { path: "/user", element: <Users /> },
      { path: "/nearExpiration", element: <Expiration /> },
      /*  { path: "/login", element: <Login /> }, */
    ];
  } else {
    return [{ path: "*", element: <Login /> }];
  }
};

export default routes;
