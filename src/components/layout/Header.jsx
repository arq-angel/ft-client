import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";

import { IoIosCreate } from "react-icons/io";
import { HiOutlineLogin } from "react-icons/hi";
import { ImExit } from "react-icons/im";
import { MdDashboard } from "react-icons/md";
import { CiBank } from "react-icons/ci";

import { useUser } from "../../context/UserContext.jsx";

const Header = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUser();

  const handleOnLogout = () => {
    // 1. delete `accessJWT` from localStorage
    localStorage.removeItem("accessJWT");

    // 2. remove user from the state
    setUser({});

    // 3. redirect to the login page
    navigate("/login");
  };

  return (
    <Navbar expand="lg" variant="dark" className="bg-body-dark">
      <Container>
        <Navbar.Brand href="#">FT</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {user?._id ? (
              <>
                <Link to="/dashboard" className="nav-link">
                  <MdDashboard /> Dashboard
                </Link>
                <Link to="/transaction" className="nav-link">
                  <CiBank /> Transaction
                </Link>
                <Link onClick={handleOnLogout} to="/" className="nav-link">
                  <ImExit /> Logout
                </Link>
              </>
            ) : (
              <>
                <Link to="/signup" className="nav-link">
                  <IoIosCreate /> Sign Up
                </Link>
                <Link to="/" className="nav-link">
                  <HiOutlineLogin /> Login
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
