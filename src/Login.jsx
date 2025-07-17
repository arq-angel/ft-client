import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import LoginForm from "./components/LoginForm.jsx";
import { BsGraphDownArrow } from "react-icons/bs";
import { BsGraphUpArrow } from "react-icons/bs";

const Login = () => {
  return (
    <Container className="p-5">
      <Row className="bg-dark p-5 rounded">
        <Col md={6} className="mb-3">
          <LoginForm />{" "}
        </Col>
        <Col md={6}>
          <div
            className="d-flex flex-column justify-content-center fs-1"
            style={{ height: "100%" }}
          >
            <div className="text-danger text-decoration-line-through">
              <BsGraphDownArrow /> Reduce your expenses
            </div>
            <div className="text-success">
              <BsGraphUpArrow /> Increase your income
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
