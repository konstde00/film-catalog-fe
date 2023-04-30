export const toPercentage = (value, prevValue) => {
  const val = parseFloat(value === (null || false) ? 0 : value);

  if (value === '') {
    return value;
  }

  if (Number.isNaN(val)) {
    return prevValue;
  }

  return [val, '%'].join('');
};

export const fromPercentage = (value) => {
  const val = value?.toString() || '';
  return val?.replace(/NaN/, '')?.replace(/%/g, '')?.trim() || value;
};

export const toCurrency = (value, currency) => {
  const val = parseFloat(value === null ? 0 : value);
  if (value === '') {
    return value;
  }
  if (Number.isNaN(val)) {
    return value;
  }
  // console.log({
  //   value,
  //   val,
  // });

  return [val, currency].join(' ');
};

export const onlyNumbers = (value) => {
  return value?.replace(/[^0-9.]+/, '')?.trim();
};

export const fromCurrency = (value, currency) => {
  const val = parseFloat(value)?.toString();
  return val?.replace(currency, '')?.replace(/NaN/, '')?.trim() || value;
};

export const removeLeadingZeros = (val) => {
  const str = val?.toString();
  return (str || '')?.replace(/^0+/, '')?.trim() || str;
};
