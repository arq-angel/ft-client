import Table from "react-bootstrap/Table";
import { useUser } from "../context/UserContext";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { FaCirclePlus } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { deleteTransactions } from "../helpers/axiosHelper";
import { toast } from "react-toastify";

const TransactionTable = () => {
  const [displayTransaction, setDisplayTransaction] = useState([]);
  const { transactions, getTransactions, toggleModal } = useUser();
  const [idsToDelete, setIdsToDelete] = useState([]);

  useEffect(() => {
    setDisplayTransaction(transactions);
  }, [transactions]);

  const balance = displayTransaction.reduce((acc, t) => {
    return t.type === "income" ? acc + t.amount : acc - t.amount;
  }, 0);

  const handleOnSearch = (e) => {
    const { value } = e.target;
    const filteredArg = transactions.filter(({ title }) => {
      return title.toLowerCase().includes(value.toLowerCase());
    });

    setDisplayTransaction(filteredArg);
  };

  const handleOnSelect = (e) => {
    const { checked, value } = e.target;
    if (value === "all") {
      checked
        ? setIdsToDelete(displayTransaction.map((item) => item._id))
        : setIdsToDelete([]);
      return;
    }

    if (checked) {
      setIdsToDelete([...idsToDelete, value]);
    } else {
      setIdsToDelete(idsToDelete.filter((id) => id !== value));
    }
    return;
  };

  const handleOnDelete = async () => {
    if (
      confirm(
        `Are you sure you want to delete ${idsToDelete.length} transaction(s)?`
      )
    ) {
      const pending = deleteTransactions(idsToDelete);
      toast.promise(pending, {
        pending: "Please wait ...",
      });

      const { status, message } = await pending;

      toast[status](message);

      // refresh the transactions list and ids to delete
      status === "success" && getTransactions() && setIdsToDelete([]);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between pt-3 mb-4">
        <div>{displayTransaction.length} transaction(s) found.</div>
        <div>
          <Form.Control type="text" onChange={handleOnSearch} />
        </div>
        <div>
          <Button onClick={() => toggleModal(true)}>
            <FaCirclePlus /> Add new transaction
          </Button>
        </div>
      </div>
      <div>
        <Form.Check
          label="Select All"
          value="all"
          onChange={handleOnSelect}
          checked={
            !(displayTransaction.length === 0) &&
            displayTransaction.length === idsToDelete.length
          }
        />
      </div>
      <Table striped hover>
        <thead>
          <tr className="text-center">
            <th>#</th>
            <th>Date</th>
            <th>Title</th>
            <th>Out</th>
            <th>In</th>
          </tr>
        </thead>
        <tbody>
          {displayTransaction.length > 0 &&
            displayTransaction.map((t, i) => (
              <tr key={t._id} className="text-center">
                <td>{i + 1}</td>
                <td>
                  <Form.Check
                    label={t.createdAt.slice(0, 10)}
                    value={t?._id}
                    onChange={handleOnSelect}
                    checked={idsToDelete.includes(t?._id)}
                  />
                </td>
                <td>{t.title}</td>
                {t.type === "expenses" ? (
                  <>
                    <td className="out">-${t.amount}</td>
                    <td></td>
                  </>
                ) : (
                  <>
                    <td></td>
                    <td className="in">${t.amount}</td>
                  </>
                )}
              </tr>
            ))}

          <tr className="fw-bold text-center">
            <td colSpan={3}>Total Balance</td>

            <td
              colSpan={2}
              className={balance < 0 ? "out" : balance > 0 ? "in" : ""}
            >
              {balance < 0 ? `-$${Math.abs(balance)}` : `$${balance}`}
            </td>
          </tr>
        </tbody>
      </Table>
      {idsToDelete.length > 0 && (
        <div className="d-grid">
          <Button variant="danger" onClick={handleOnDelete}>
            Delete {idsToDelete.length} transaction(s)
          </Button>
        </div>
      )}
    </div>
  );
};

export default TransactionTable;
