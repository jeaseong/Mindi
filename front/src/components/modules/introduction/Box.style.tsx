import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled(motion.div)`
  max-width: 768px;
  width: 100%;
  height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
