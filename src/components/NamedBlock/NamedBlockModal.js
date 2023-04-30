import React from 'react';
import Modal from '../Modal/Modal';
const emptyFunction = () => {};

export const NamedBlockModal = ({ isOpen, item, setIsOpen, title, renderBody = emptyFunction }) => {
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <Modal isOpen={isOpen} title={title} show={true} onRequestClose={closeModal}>
      {renderBody(closeModal, item)}
    </Modal>
  );
};
