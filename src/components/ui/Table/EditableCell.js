import React, { useEffect, useState } from 'react';
import { Input } from 'antd';
import { toCurrency, toPercentage } from '../../../utils/formatting';
import styles from './Table.module.scss';
import { formattingActions } from '../../formik/FKInput/FKInput';

export const EditableCell = ({
  value: initialValue,
  row,
  column,
  type = 'text',
  updateMyData = () => {},
  formattingActions: inputActions = [],
  currency,
}) => {
  const [value, setValue] = useState(initialValue);
  const [formattedValue, setFormattedValue] = useState(value);

  const onChange = ({ target: { value } }) => {
    setValue(value);
    setFormattedValue(value);
  };

  const onBlur = () => {
    const val = removeLeadingZeroes(value);
    setValue(val);
    formatInput(val);
    updateMyData(val, row.original, column.id);
  };

  const onFocus = () => {
    setFormattedValue(value);
  };

  const toPercentageFn = (value) => {
    if (inputActions.find((i) => i === formattingActions.TO_PERCENTAGE)) {
      return toPercentage(value);
    }
    return value;
  };
  const toCurrencyFn = (value) => {
    if (inputActions.find((i) => i === formattingActions.TO_CURRENCY)) {
      return toCurrency(value, currency);
    }
    return value;
  };

  const removeLeadingZeroes = (val) => {
    if (inputActions.find((i) => i === formattingActions.REMOVE_LEADING_ZEROES)) {
      return parseFloat(val || '0')?.toString();
    }

    return val;
  };

  const formatInput = (value) => {
    const val = removeLeadingZeroes(value);
    const toPercentage = toPercentageFn(val);
    const toCurrency = toCurrencyFn(toPercentage);

    setFormattedValue(toCurrency);
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    formatInput(initialValue);
  }, [initialValue]);

  return (
    <Input
      className={styles.input}
      value={formattedValue}
      onChange={onChange}
      onBlur={onBlur}
      type={type}
      onFocus={onFocus}
    />
  );
};
