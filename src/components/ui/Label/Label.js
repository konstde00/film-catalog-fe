import React from 'react';
import styles from './Label.module.scss';

export const POSITIONS = {
  RIGHT: 'right',
  TOP: 'top',
};

export const Label = ({ position = POSITIONS.RIGHT, text = '', children, width = 250 }) => {
  const className = position === POSITIONS.RIGHT ? styles.labelRight : styles.labelTop;
  const labelStyle = position === POSITIONS.RIGHT ? { width } : undefined;
  const wrapperStyle = position === POSITIONS.TOP ? { width } : undefined;

  return (
    <div className={className} style={wrapperStyle}>
      <span style={labelStyle}>{text}</span>
      {children}
    </div>
  );
};
