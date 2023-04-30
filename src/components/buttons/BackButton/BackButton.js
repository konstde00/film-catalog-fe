import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import styles from './BackButton.module.scss';
import { ReactComponent as ArrowLeftIcon } from '../../../assets/img/arrow_left.svg';

const BackButton = ({ title, backTo = '' }) => {
  const history = useHistory();

  const goBack = useCallback(() => {
    history.push(backTo);
  }, [history, backTo]);

  return (
    <button type='button' onClick={goBack} className={styles.button}>
      <ArrowLeftIcon />
      <span className={styles.button_title}>{title}</span>
    </button>
  );
};

export default BackButton;

BackButton.propTypes = {
  title: PropTypes.string.isRequired,
  backTo: PropTypes.string.isRequired,
};
