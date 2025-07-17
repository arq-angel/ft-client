import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import FinancialTips from "../components/FinancialTips.jsx";
import SignUpForm from "../components/SignUpForm.jsx";

const SignUp = () => {
  return (
    <Container className="p-5">
      <Row className="bg-dark p-5 rounded">
        <Col md={6} className="mb-3">
          <FinancialTips />{" "}
        </Col>
        <Col md={6}>
          <SignUpForm />{" "}
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
