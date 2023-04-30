import React from 'react';
import { Button } from 'antd';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import styles from './BorderedButton.module.scss';

const BorderedButton = ({
  label,
  icon,
  loading,
  onClick,
  type,
  height,
  width,
  textColor,
  fontWeight,
  buttonClassName,
  ...rest
}) => {
  return (
    <Button
      htmlType={type}
      icon={icon}
      loading={loading}
      onClick={onClick}
      className={classNames('p-button-outlined', styles.button)}
      style={{
        height,
        minWidth: width,
        color: textColor,
        fontWeight,
      }}
      {...rest}
    >
      {label}
    </Button>
  );
};

export default BorderedButton;

BorderedButton.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.element,
  loading: PropTypes.bool,
  height: PropTypes.number,
  width: PropTypes.number,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  onClick: PropTypes.func,
  textColor: PropTypes.string,
  fontWeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

BorderedButton.defaultProps = {
  icon: null,
  loading: false,
  type: 'button',
  height: 50,
  width: 200,
  onClick: () => {},
  textColor: '#DA1B5E',
  fontWeight: 700,
};
