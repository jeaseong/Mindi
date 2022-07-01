import React from 'react';
import styled from 'styled-components';

export const ModalContainer = styled.div`
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
`;

export const DialogBox = styled.div`
  border: 1px solid black;
  width: 90%;
  max-width: 700px;
  height: 700px;
  box-shadow: 0 0 30px rgba(30, 30, 30, 0.185);
  box-sizing: border-box;
  background-color: #f6e6f5;
  z-index: 10000;
  ${({ theme }) => theme.media.tablet`
    max-width: 700px;
    height: 830px;
  `}
`;

export const Backdrop = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.2);
`;
