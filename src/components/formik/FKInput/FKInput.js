import React from 'react';
import { Input, Tooltip } from 'antd';
import styles from './FKInput.module.scss';
import { fromPercentage, toPercentage } from '../../../utils/formatting';

export const formattingActions = {
  TO_PERCENTAGE: 'TO_PERCENTAGE',
  TO_CURRENCY: 'TO_CURRENCY',
  TO_NUMBER: 'TO_NUMBER',
  REMOVE_LEADING_ZEROES: 'REMOVE_LEADING_ZEROES',
};

const FkInput = ({
  field,
  form,
  formattingAction,
  meta,
  defaultValue,
  checkError = () => [false, false],
  ...props
}) => {
  console.log("FkInput");
  const [error, touched] = checkError(form, field);

  const createValues = ({ root = {}, fn, pathPosition = 0 }) => {
    const path = field.name.split('.').slice(pathPosition);
    const accessor1 = path[0];
    const accessor2 = path[1];
    return {
      ...root,
      [accessor1]: Array.isArray(root[accessor1])
        ? root[accessor1].map((f, index) => {
            if (index === +accessor2) {
              return createValues({
                pathPosition: pathPosition + 2,
                root: f,
                fn,
              });
            }

            return f;
          })
        : fn(field.value),
    };
  };

  const onFocusHandler = () => {
    if (formattingActions.TO_PERCENTAGE === formattingAction) {
      const values = createValues({
        root: form.values,
        fn: fromPercentage,
      });
      form.setValues(values);
    }
  };
  const onBlurHandler = (e) => {
    field?.onBlur(e);

    if (formattingActions.TO_PERCENTAGE === formattingAction) {
      const values = createValues({
        root: form.values,
        fn: toPercentage,
      });
      form.setValues(values);
    }
  };

  return (
    <>
      <Tooltip visible={error !== undefined && touched} title={typeof error === 'string' ? error : undefined}>
        <Input {...field} {...props} onBlur={onBlurHandler} onFocus={onFocusHandler} className={styles.input} />
      </Tooltip>
    </>
  );
};

export default FkInput;
