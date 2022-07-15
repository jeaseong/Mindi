import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled.div`
  width: 80%;
  max-width: 1024px;
  margin: 0 auto;
`;

export const MainTemplate = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  margin-bottom: 20px;
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

export const LogoText = styled(motion.img)`
  position: absolute;
`;

export const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const BottomImg = styled(motion.img)`
  @media screen and (max-width: 500px) {
    display: none;
  }
`;

export const ToEITest = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: end;
  width: max-content;
`;

export const EITestButton = styled(motion.button)`
  position: absolute;
  font-size: 1rem;
  color: black;
  background-color: transparent;
  border: none;
  cursor: pointer;
  margin-right: 30px;
  margin-top: 24px;
  @media screen and (max-width: 500px) {
    padding: 10px;
    margin: 0;
  }
`;

export const ToRegister = styled(motion.div)`
  display: flex;
  align-items: center;
  width: max-content;
`;

export const RegisterButton = styled(motion.button)`
  position: absolute;
  font-size: 1rem;
  color: black;
  background-color: transparent;
  border: none;
  cursor: pointer;
  margin-left: 34px;
  margin-top: 10px;
  @media screen and (max-width: 500px) {
    padding: 10px;
    margin: 0;
  }
`;
