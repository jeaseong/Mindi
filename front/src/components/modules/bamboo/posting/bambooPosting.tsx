import React from 'react';

function BambooPosting() {
  const today = new Date();

  const month = ('0' + (today.getMonth() + 1)).slice(-2);
  const year = today.getFullYear();
  const day = ('0' + today.getDate()).slice(-2);

  const dateString = year + '. ' + month + '. ' + day + '. ';

  return (
    <>
      <h1>{dateString}</h1>
    </>
  );
}

export default BambooPosting;
