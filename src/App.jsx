import { Routes, Route, Outlet, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import Login from "./Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Transaction from "./pages/Transaction.jsx";
import DefaultLayout from "./components/layout/DefaultLayout.jsx";
import Auth from "./auth/Auth.jsx";
import { useEffect } from "react";
import { autoLogin } from "./utils/users.js";
import { useUser } from "./context/UserContext.jsx";

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
