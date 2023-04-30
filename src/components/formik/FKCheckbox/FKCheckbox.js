import React from 'react';
import { Checkbox } from 'antd';

// import styles from './FKCheckbox.module.scss';

const FkCheckbox = ({ field, form, meta, ...props }) => {
  return <Checkbox {...field} checked={field.value} {...props} />;
};

export default FkCheckbox;
