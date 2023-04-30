import { useEffect, useState } from 'react';
import { emptyFunction } from '../../../utils/functions';

export const ColorInput = ({ defaultValue = '', onChange = emptyFunction }) => {
  const [value, setValue] = useState(defaultValue);

  const handleChange = ({ target: { value } }) => {
    setValue(value);
    onChange(value);
  };

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  return <input type='color' value={value} onChange={handleChange} />;
};
