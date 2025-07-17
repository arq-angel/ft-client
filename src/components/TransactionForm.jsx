import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import CustomInput from "./CustomInput";
import useForm from "../hooks/useForm.js";
import { postNewTransaction } from "../helpers/axiosHelper.js";
import { toast } from "react-toastify";
import { useUser } from "../context/UserContext.jsx";
import { useState } from "react";

const initialState = {
  type: "",
  title: "",
  amount: "",
  tDate: "",
};

const TransactionForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { form, setForm, handleOnChange } = useForm(initialState);
  const { getTransactions, toggleModal } = useUser();

  const fields = [
    {
      label: "Title",
      placeholder: "Salary",
      required: true,
      type: "text",
      name: "title",
      value: form.title,
    },
    {
      label: "Amount",
      placeholder: "0.00",
      required: true,
      type: "number",
      name: "amount",
      min: 0,
      value: form.amount,
    },
    {
      label: "Transaction Date",
      required: true,
      type: "date",
      name: "tDate",
      value: form.tDate,
    },
  ];

  const handleOnSubmit = async (e) => {
    setIsSubmitting(true);
    e.preventDefault();

    const { status, message } = await postNewTransaction(form);

    toast[status](message);

    if (status === "success") {
      setForm(initialState);

      // call the function to fetch all transactions
      getTransactions();

      // close the modal
      toggleModal(false);
    }

    setIsSubmitting(false);
  };

  return (
    <div className="border rounded p-4">
      <h4 className="mb-5">Add your transaction!</h4>
      <Form onSubmit={handleOnSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Transaction type</Form.Label>
          <Form.Select name="type" onChange={handleOnChange} required>
            <option value="">-- select --</option>
            <option value="income">Income</option>
            <option value="expenses">Expenses</option>
          </Form.Select>
        </Form.Group>

        {fields.length > 0 &&
          fields.map((input) => (
            <CustomInput
              key={input.name}
              {...input}
              onChange={handleOnChange}
            />
          ))}

        <div className="d-grid">
          <Button variant="primary" type="submit" disabled={isSubmitting}>
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default TransactionForm;
