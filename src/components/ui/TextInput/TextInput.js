import React, { useState } from 'react';
import { Input } from 'antd';
import styles from './TextInput.module.scss';
import { fromCurrency, fromPercentage, onlyNumbers, toCurrency, toPercentage } from '../../../utils/formatting';
import { formattingActions } from '../../formik/FKInput/FKInput';

export const TextInput = ({
  label,
  onChange = () => {},
  onFocus,
  formattingAction,
  currency,
  onBlur,
  value,
  ...props
}) => {
  const [prevValue, setPrevValue] = useState('');
  const onChangeHandler = ({ target: { value } }) => {
    if (
      formattingActions.TO_CURRENCY === formattingAction ||
      formattingActions.TO_PERCENTAGE === formattingAction ||
      formattingActions.TO_NUMBER === formattingAction
    ) {
      const valueWithoutLetters = onlyNumbers(value);
      onChange(valueWithoutLetters);
    } else {
      onChange(value);
    }
  };

  const onFocusHandler = (e) => {
    setPrevValue(value);
    if (formattingActions.TO_PERCENTAGE === formattingAction) {
      onChange(fromPercentage(value));
    }
    if (formattingActions.TO_CURRENCY === formattingAction) {
      onChange(fromCurrency(value, currency));
    }
    if (onFocus) {
      onFocus(e);
    }
  };

  const onBlurHandler = (e) => {
    if (formattingAction) {
      if (formattingActions.TO_PERCENTAGE === formattingAction) {
        const percentageValue = toPercentage(value, prevValue);
        onChange(percentageValue);
        if (onBlur) onBlur(e);
      }

      if (formattingActions.TO_CURRENCY === formattingAction) {
        const currencyValue = toCurrency(value, currency);
        onChange(currencyValue);
        if (onBlur) onBlur(e);
      }

      if (formattingActions.TO_NUMBER === formattingAction) {
        if (onBlur) onBlur(e);
      }
    } else if (onBlur) onBlur(e);
  };

  return (
    <Input
      {...props}
      value={value}
      onChange={onChangeHandler}
      onFocus={onFocusHandler}
      onBlur={onBlurHandler}
      className={styles.textInput}
    />
  );
};
