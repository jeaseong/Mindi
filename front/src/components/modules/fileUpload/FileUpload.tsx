import React, { useState } from 'react';
import Image from 'components/atoms/image/Image';
import { UploadFile, UploadFileLabel } from './FileUpload.style';
import { IMAGE } from 'components/utils/image';

function FileUpload({ editImg, setEditImg, imgUrl, setImgUrl, formData }: any) {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setEditImg(img);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    formData.append('file', editImg.data);
    setImgUrl(editImg.preview);
  };
  return (
    <form onSubmit={onSubmit}>
      <UploadFileLabel htmlFor='uploadFile'>
        <Image
          src={imgUrl}
          alt={IMAGE.IMG_UPLOAD_BASIC.alt}
          width='100%'
          height='200px'
        />
      </UploadFileLabel>
      <UploadFile
        id='uploadFile'
        type='file'
        accept='image/*'
        onChange={onChange}
      />
    </form>
  );
}

export default FileUpload;
