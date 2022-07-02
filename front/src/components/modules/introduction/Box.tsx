import React, { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Container } from './Box.style';

const boxVariant = {
  visible: { opacity: 1, scale: 1.2, transition: { duration: 0.5 } },
  hidden: { opacity: 0, scale: 0 },
};
interface BoxProps {
  children: React.ReactNode;
}

function Box({ children }: BoxProps) {
  const control = useAnimation();
  const observeRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (observeRef.current) {
            control.start('visible');
          } else {
            control.start('hidden');
          }
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      },
    );
    if (observeRef.current) {
      observer.observe(observeRef.current);
    }
    return () => observer.disconnect();
  }, [observeRef]);

  useEffect(() => {
    if (!observeRef.current) {
      control.start('hidden');
    }
  }, [control, observeRef]);

  return (
    <Container
      className='box'
      ref={observeRef}
      variants={boxVariant}
      initial='hidden'
      animate={control}
    >
      {children}
    </Container>
  );
}
export default Box;
