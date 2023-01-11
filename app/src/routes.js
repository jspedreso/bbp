import Home from "./pages/Home";
import Permit from "./pages/Permit";
import Report from "./pages/Report";
import Users from "./pages/User";
import Expiration from "./pages/Expire";

const routes = [
  { path: "/", element: <Home /> },
  { path: "/permit", element: <Permit /> },
  { path: "/report", element: <Report /> },
  { path: "/user", element: <Users /> },
  { path: "/nearExpiration", element: <Expiration /> },
];

export default routes;
