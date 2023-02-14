import Modal from "react-modal";
import { Container, RadioBox, TransactionTypeContainer } from "./styles";
import closeImg from "../../assets/close.svg";
import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";
import { FormEvent, useContext, useState } from "react";
import { api } from "../../services/api";
import { TransactionsContext } from "../../TransactionsContext";

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTransactionModal({
  isOpen,
  onRequestClose,
}: NewTransactionModalProps) {
  const { createTransaction } = useContext(TransactionsContext);
  const [title, setTitle] = useState("");
  const [amonut, setAmount] = useState(0);
  const [category, setCategoty] = useState("");
  const [type, setType] = useState("deposit");

  async function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault();

    await createTransaction({
      amount: amonut,
      title: title,
      category: category,
      type: type,
    });

    setTitle("");
    setAmount(0);
    setCategoty("");
    setType("deposit");

    onRequestClose();
  }

  return (
    <Modal
      onRequestClose={onRequestClose}
      isOpen={isOpen}
      overlayClassName="react-modal-overley"
      className="react-modal-content"
    >
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
      >
        <img src={closeImg} alt="fechar modal" />
      </button>

      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar Transação</h2>

        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="título"
        />

        <input
          value={amonut}
          onChange={(event) => setAmount(Number(event.target.value))}
          placeholder="valor"
          type="number"
        />

        <TransactionTypeContainer>
          <RadioBox
            isActive={type === "deposit"}
            type="button"
            onClick={() => setType("deposit")}
            activeColor="green"
          >
            <img src={incomeImg} alt="entrada" />
            <span>Entrada</span>
          </RadioBox>

          <RadioBox
            activeColor="red"
            type="button"
            onClick={() => setType("withdraw")}
            isActive={type === "withdraw"}
          >
            <img src={outcomeImg} alt="saída" />
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>

        <input
          placeholder="categoria"
          value={category}
          onChange={(event) => setCategoty(event.target.value)}
        />

        <button type="submit">Cadastrar</button>
      </Container>
    </Modal>
  );
}
