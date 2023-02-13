import Modal from "react-modal";
import { Container } from "./styles";
import closeImg from "../../assets/close.svg";

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTransactionModal({
  isOpen,
  onRequestClose,
}: NewTransactionModalProps) {
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

      <Container>
        <h2>Cadastrar Transação</h2>

        <input placeholder="título" />
        <input placeholder="valor" type="number" />
        <input placeholder="categoria" />
        <button type="submit">Cadastrar</button>
      </Container>
    </Modal>
  );
}
