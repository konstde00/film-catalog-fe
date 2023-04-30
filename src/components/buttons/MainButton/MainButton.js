import React from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';

import styles from './MainButton.module.scss';

const MainButton = ({ label, icon, loading, onClick, type, height, width, ...rest }) => {
  return (
    <Button
      icon={icon}
      loading={loading}
      onClick={onClick}
      htmlType={type}
      className={styles.button}
      style={{
        height,
        minWidth: width,
      }}
      {...rest}
    >
      {label}
    </Button>
  );
};

export default MainButton;

MainButton.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.element,
  loading: PropTypes.bool,
  height: PropTypes.number,
  width: PropTypes.number,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  onClick: PropTypes.func,
};

MainButton.defaultProps = {
  icon: null,
  loading: false,
  type: 'button',
  height: 50,
  width: 200,
  onClick: () => {},
};
