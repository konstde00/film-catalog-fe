import React from 'react';
import { ReactComponent as InactiveSwitch } from '../../../assets/img/inactive_toggle.svg';
import { ReactComponent as ActiveSwitch } from '../../../assets/img/active_toggle.svg';
import styles from './Switch.module.scss';

const Switch = ({ value, onChange, disabled }) => {
  const onChangeHandler = () => {
    if (!disabled) {
      onChange(!value);
    }
  };

  return (
    <span
      role='presentation'
      className={disabled ? `${styles.switch} ${styles.disabled}` : styles.switch}
      onClick={onChangeHandler}
    >
      {value ? <ActiveSwitch /> : <InactiveSwitch />}
    </span>
  );
};

export default Switch;
