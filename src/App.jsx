import { Routes, Route, Outlet, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import Login from "./pages/login";

function App() {
  return (
    <>
      <Routes>
        <Route index path="/" element={<Login />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
