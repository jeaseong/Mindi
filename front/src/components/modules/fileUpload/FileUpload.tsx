import React from 'react';
import { useSnackbarContext } from 'contexts/SnackbarContext';
import Image from 'components/atoms/image/Image';
import { FileProps } from 'types/atoms';
import { IMAGE } from 'utils/image';
import { UploadFile, UploadFileLabel } from './FileUpload.style';

function FileUpload({ editImg, onChangeFile }: FileProps) {
  const { openSnackBar } = useSnackbarContext();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    if (e.target.files[0].size > 1024 * 1024 * 5) {
      return openSnackBar(false, '이미지는 5MB 이하만 업로드 가능합니다!');
    }
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    onChangeFile(img);
  };
  return (
    <>
      <UploadFileLabel htmlFor='uploadFile'>
        <Image
          src={editImg.preview}
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
    </>
  );
}

export default React.memo(FileUpload);
