import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "./services/api";

interface Transaction {
  id: number;
  title: string;
  amount: number;
  type: string;
  category: string;
  createdAt: string;
}

interface TransactionsContextData {
  transactions: Array<Transaction>;
  createTransaction: (transaction: TransactionInput) => void;
}

//Omit => omite os campos de "id" e "createdAt"
type TransactionInput = Omit<Transaction, "id" | "createdAt">;

//Pick => informa quais campos devem conter dentro
// type TransactionInput = Pick<Transaction, "title" | "amount" | "type" | "category">;

interface TransactionsProviderProps {
  children: ReactNode; // => aceita elementos jsx do react
}

export const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData
);

export const TransactionsProvider = ({
  children,
}: TransactionsProviderProps) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    api
      .get("transactions")
      .then((response) => setTransactions(response.data.transactions));
  }, []);

  function createTransaction(transaction: TransactionInput) {
    api.post("transactions", transaction);
  }

  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );
};
