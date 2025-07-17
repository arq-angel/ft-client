import { Routes, Route, Outlet, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Transaction from "./pages/Transaction";
import DefaultLayout from "./components/layout/DefaultLayout";
import Auth from "./auth/Auth";
import { useEffect } from "react";
import { autoLogin } from "./utils/users";
import { useUser } from "./context/UserContext";

function App() {
  const { user, setUser } = useUser();

  useEffect(() => {
    !user?._id && updateUser();
  }, [user?._id]);

  const updateUser = async () => {
    const userFromAutoLogin = await autoLogin();
    setUser(userFromAutoLogin);
  };

  return (
    <div className="wrapper">
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<Login />} />
          <Route index path="signup" element={<SignUp />} />

          <Route
            index
            path="dashboard"
            element={
              <Auth>
                <Dashboard />
              </Auth>
            }
          />
          <Route
            index
            path="transaction"
            element={
              <Auth>
                <Transaction />
              </Auth>
            }
          />
        </Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
