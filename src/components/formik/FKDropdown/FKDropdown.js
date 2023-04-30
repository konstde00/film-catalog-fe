import React, { useCallback } from 'react';
import { Select } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
// import { getIn } from 'formik';
import styles from './FKDropdown.module.scss';

const { Option } = Select;

const FkDropdown = ({ field, form, meta, value, ...props }) => {
  // const error = getIn(form.errors, field.name);
  // const touch = getIn(form.touched, field.name);

  const onChange = useCallback(
    (value) => {
      form.setFieldValue(field.name, value);
    },
    [form, field],
  );

  return (
    <Select
      {...field}
      {...props}
      value={value || field.value || undefined}
      suffixIcon={<CaretDownOutlined className={styles.dropdown_icon} />}
      onChange={props.onChange || onChange}
      className={styles.dropdown}
    >
      {props?.options?.map(({ value, name }) => (
        <Option key={name} value={value}>
          {name}
        </Option>
      ))}
    </Select>
  );
};

export default FkDropdown;
