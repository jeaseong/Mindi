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
  width: 500px;
  height: 800px;
  /* border-radius: 3px; */
  box-shadow: 0 0 30px rgba(30, 30, 30, 0.185);
  box-sizing: border-box;
  background-color: #f6e6f5;
  z-index: 10000;

  @media screen and (min-width: 1024px) {
    width: 500px;
    height: 700px;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    width: 50%;
    height: 800px;
  }
  @media screen and (min-width: 376px) and (max-width: 767px) {
    width: 90%;
    height: 90%;
  }
  @media screen and (max-width: 375px) {
    width: 80%;
    height: 80%;
  }
`;

export const Backdrop = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.2);
`;
