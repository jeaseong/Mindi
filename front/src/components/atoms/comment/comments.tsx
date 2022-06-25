import React, { useEffect, useState } from 'react';

const Comments = (currentUserId: any) => {
  const [backendComments, setBackendComments] = useState([]);

  useEffect(() => {
    // getCommentApi().then((data)=>{setBackendComments(data)})
  }, []);
  return <div></div>;
};

export default Comments;
