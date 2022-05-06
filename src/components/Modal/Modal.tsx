const Modal = ({ children, showModal }: { children: React.ReactNode; showModal: boolean }) => {
  return (
    <div className={`modal-background ${showModal ? "flex-total-center" : ""}`}>{children}</div>
  );
};

export { Modal };
