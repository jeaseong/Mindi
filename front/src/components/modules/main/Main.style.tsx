import styled from 'styled-components';
import { motion } from 'framer-motion';

export const MainTemplate = styled(motion.div)`
  width: 100%;
  height: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const MainButton = styled(motion.button)`
  position: absolute;
  margin-top: 3.5em;
  font-family: 'Courier New', Courier, monospace;
  font-size: 2rem;
  color: black;
  background-color: transparent;
  border: none;
  cursor: pointer;

  @media screen and (max-width: 768px) {
    font-size: 1rem;
  }
`;

export const ImageWrapper = styled(motion.div)`
  display: flex;
  justify-content: right;
  width: fit-content;
  height: fit-content;
  margin: 0 2em;
`;

export const MainImg = styled(motion.img)``;

export const BottomImg = styled(motion.img)`
  @media screen and (max-width: 1023px) {
    display: none;
  }
`;

export const LogoText = styled(motion.img)`
  position: absolute;
`;

export const EITestButton = styled(motion.button)`
  margin-right: 35px;
  margin-top: 60px;
  position: absolute;
  font-size: 1rem;
  color: black;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

export const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ToEITest = styled(motion.div)`
  display: flex;
  width: max-content;
  justify-content: end;
`;

export const ToRegister = styled(motion.div)`
  display: flex;
  width: max-content;
  justify-content: start;
`;

export const RegisterButton = styled(motion.button)`
  margin-left: 55px;
  margin-top: 60px;
  position: absolute;
  font-size: 1rem;
  color: black;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;
