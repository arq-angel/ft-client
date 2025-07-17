import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar.jsx";
import { Link } from "react-router-dom";

import { IoIosCreate } from "react-icons/io";
import { HiOutlineLogin } from "react-icons/hi";
import { ImExit } from "react-icons/im";
import { MdDashboard } from "react-icons/md";
import { CiBank } from "react-icons/ci";

import { useUser } from "../../context/UserContext.jsx";
import { useState } from "react";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { user, setUser } = useUser();

  const handleOnLogout = () => {
    // 1. delete `accessJWT` from localStorage
    localStorage.removeItem("accessJWT");

    // 2. remove user from the state
    setUser({});
    setShowMenu(false);
  };

  return (
    <Navbar
      expand="lg"
      variant="dark"
      className="bg-body-dark"
      expanded={showMenu}
    >
      <Container>
        <Navbar.Brand href="#">FT</Navbar.Brand>
        {user?._id && <div>Welcome, {user?.name}</div>}
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={() => setShowMenu(!showMenu)}
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {user?._id ? (
              <>
                <Link
                  onClick={() => setShowMenu(false)}
                  to="/dashboard"
                  className="nav-link"
                >
                  <MdDashboard /> Dashboard
                </Link>
                <Link
                  onClick={() => setShowMenu(false)}
                  to="/transaction"
                  className="nav-link"
                >
                  <CiBank /> Transaction
                </Link>
                <Link onClick={handleOnLogout} to="/" className="nav-link">
                  <ImExit /> Logout
                </Link>
              </>
            ) : (
              <>
                <Link
                  onClick={() => setShowMenu(false)}
                  to="/signup"
                  className="nav-link"
                >
                  <IoIosCreate /> Sign Up
                </Link>
                <Link
                  onClick={() => setShowMenu(false)}
                  to="/"
                  className="nav-link"
                >
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
