import "./App.css";
/* import { Route, Routes } from "react-router"; */
import MainLayout from "./components/layout/MainLayout";
import routes from "./routes";
import { useRoutes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const content = useRoutes(routes);
  <div>
    {content}
    <MainLayout>
      <ToastContainer position='top-right' autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme='light' />
      <ToastContainer />
    </MainLayout>
  </div>;
};

export default App;
