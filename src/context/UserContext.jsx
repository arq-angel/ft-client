import { createContext, useContext, useState } from "react";
import { fetchTransactions } from "../helpers/axiosHelper.js";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [transactions, setTransactions] = useState([]);
  const [show, setShow] = useState(false);

  const toggleModal = (value) => setShow(value);

  const getTransactions = async () => {
    // call axios helper to call api
    const { status, transactions } = await fetchTransactions();

    // receive data and mount to the transactions by setTransactions()
    status === "success" && setTransactions(transactions);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        getTransactions,
        transactions,
        toggleModal,
        show,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
