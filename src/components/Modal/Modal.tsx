const Modal = ({
  children,
  showModal,
  setShowModal,
}: {
  children: React.ReactNode;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className={`modal-background ${showModal ? "flex-total-center" : ""}`}>{children}</div>
  );
};

export { Modal };
