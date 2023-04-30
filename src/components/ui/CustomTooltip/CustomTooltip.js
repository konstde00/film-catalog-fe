import React from 'react';
import { Tooltip } from 'antd';
import { createGlobalStyle } from 'styled-components';

const CustomTooltip = ({ title, children }) => {
  const GlobalStyle = createGlobalStyle`
      body {
        .ant-tooltip-inner {
          border-radius: 8px;
          color: #fff;
          background: linear-gradient(287.86deg, #282828 0%, #404055 48.28%, #141414 98.62%);
          box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
        }
      }
    `;


  return (
    <Tooltip title={title}>
      <GlobalStyle />
      {children}
    </Tooltip>
  );
};

export default CustomTooltip;
