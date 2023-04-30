import React, { useCallback } from 'react';

import styles from './FKSwitch.module.scss';
import { ReactComponent as InactiveSwitch } from '../../../assets/img/inactive_toggle.svg';
import { ReactComponent as ActiveSwitch } from '../../../assets/img/active_toggle.svg';

const FkSwitch = ({ field, form, meta, ...props }) => {
  const onChange = useCallback(() => {
    form.setFieldValue(field.name, !field.value);
  }, [form, field]);

  return (
    <button onClick={onChange} type='button' className={styles.switch} {...props}>
      {field.value ? <ActiveSwitch /> : <InactiveSwitch />}
    </button>
  );
};

export default FkSwitch;
