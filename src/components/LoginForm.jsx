import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import CustomInput from "./CustomInput";
import useForm from "../hooks/useForm.js";
import { loginUser } from "../helpers/axiosHelper.js";
import { toast } from "react-toastify";
import { useUser } from "../context/UserContext.jsx";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const initialState = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const location = useLocation();
  console.log(location);
  const navigate = useNavigate();

  const { user, setUser } = useUser();
  const { form, handleOnChange } = useForm(initialState);

  const goTo = location?.state?.from?.pathname || "dashboard";
  useEffect(() => {
    user?._id && navigate(goTo);
  }, [user?._id, navigate, goTo]);

  const fields = [
    {
      label: "Email",
      placeholder: "john@doe.com",
      required: true,
      type: "email",
      name: "email",
      value: form.email,
    },
    {
      label: "Password",
      placeholder: "********",
      required: true,
      type: "password",
      name: "password",
      value: form.password,
    },
  ];

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    console.log(form);

    const pendingResponse = loginUser(form);
    toast.promise(pendingResponse, {
      pending: "Please wait...",
    });

    const { status, message, user, accessJWT } = await pendingResponse;

    toast[status](message);
    console.log(user, accessJWT);
    setUser(user);
    localStorage.setItem("accessJWT", accessJWT);
  };

  return (
    <div className="border rounded p-4">
      <h4 className="mb-5">Sign in now!</h4>
      <Form onSubmit={handleOnSubmit}>
        {fields.length > 0 &&
          fields.map((input) => (
            <CustomInput
              key={input.name}
              {...input}
              onChange={handleOnChange}
            />
          ))}

        <div className="d-grid">
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default LoginForm;
