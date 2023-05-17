import React, { useEffect, useMemo } from "react";
import ReactModal from 'react-modal';
import { CloseOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

import styles from './Modal.module.scss';

const Modal = ({ isOpen, onRequestClose, children, title, width }) => {
  const customStyles = useMemo(() => {
    return {
      body: {
        overflow: "hidden",
      },
      header: {
        minWidth: width,
        maxWidth: width,
        overflow: "hidden",
      },
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        border: 'none',
        padding: 0,
        minWidth: width,
        maxWidth: width,
        maxHeight: '75vh',
        overflow: "hidden"
      },
      overlay: {
        backgroundColor: '#00000070',
        zIndex: 10,
      },
    };
  }, [width]);



  return (
    <ReactModal isOpen={isOpen} onRequestClose={onRequestClose} ariaHideApp={false} style={customStyles}>
      <header className={styles.header}>
        <span>{title}</span>
        <CloseOutlined onClick={onRequestClose} className={styles.closeIcon} />
      </header>
      <div className={styles.content}>{children}</div>
    </ReactModal>
  );
};

export default Modal;

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onRequestClose: PropTypes.func,
};

Modal.defaultProps = {
  title: null,
  width: 500,
  onRequestClose: () => {},
};
