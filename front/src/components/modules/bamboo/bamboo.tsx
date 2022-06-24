import React, { useState } from 'react';
import Modal from 'components/atoms/modal/modal';

function Bamboo() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Modal modalStatus={true} date='string' text='text' />
    </>
  );
}

export default Bamboo;
