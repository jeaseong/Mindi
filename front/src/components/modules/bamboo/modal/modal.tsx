import React, { PropsWithChildren } from 'react';
import { ModalContainer, DialogBox, Backdrop } from './modal.style';

interface ModalDefaultType {
  onClickToggleModal: () => void;
}

function Modal({
  onClickToggleModal,
  children,
}: PropsWithChildren<ModalDefaultType>) {
  return (
    <>
      <ModalContainer>
        <DialogBox>{children}</DialogBox>
        <Backdrop
          onClick={(e: React.MouseEvent) => {
            e.preventDefault();

            if (onClickToggleModal) {
              onClickToggleModal();
            }
          }}
        />
      </ModalContainer>
    </>
  );
}

export default Modal;
