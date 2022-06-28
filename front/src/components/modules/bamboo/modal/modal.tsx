import React, { PropsWithChildren } from 'react';
import {
  ModalContainer,
  DialogBox,
  ContentWrapper,
  Backdrop,
} from './modal.style';

interface ModalDefaultType {
  onClickToggleModal: () => void;
}

function Modal({
  onClickToggleModal,
  children,
}: PropsWithChildren<ModalDefaultType>) {
  return (
    <ModalContainer>
      <DialogBox>
        <ContentWrapper>{children}</ContentWrapper>
      </DialogBox>
      <Backdrop
        onClick={(e: React.MouseEvent) => {
          e.preventDefault();

          if (onClickToggleModal) {
            onClickToggleModal();
          }
        }}
      />
    </ModalContainer>
  );
}

export default Modal;
