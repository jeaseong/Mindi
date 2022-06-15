import React, { useState, useMemo } from 'react';
import { useCurUser } from 'components/hooks/userQuery';
import { postDiaryPosting } from 'api/api';
import FileUpload from 'components/modules/fileUpload/FileUpload';
import MainTitle from 'components/atoms/text/MainTitle';
import TextArea from 'components/atoms/textArea/TextArea';
import Button from 'components/atoms/button/Button';
import { IMAGE } from 'components/utils/image';
import { PostingContainer, Area, SubTitle, AlignRight } from './Posting.style';

function Posting() {
  const [simpleDiary, setSimpleDiary] = useState('');
  const [mindDiary, setMindDiary] = useState('');
  const [imgUrl, setImgUrl] = useState(`${IMAGE.IMG_UPLOAD_BASIC.url}`);
  const [editImg, setEditImg] = useState({ preview: '', data: '' });
  const formData = useMemo(() => new FormData(), [editImg]);

  const { data } = useCurUser();

  const onChangeSimple = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSimpleDiary((cur) => e.target.value);
  };

  const onChangeMind = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMindDiary((cur) => e.target.value);
  };
  const onSubmit = () => {
    const diaryData = {
      userId: data?.userState._id,
      diary: simpleDiary,
      feeling: mindDiary,
    };
    formData.append('diaryData', JSON.stringify(diaryData));
    postDiaryPosting(formData);
  };

  const fileuploadPros = {
    editImg,
    imgUrl,
    formData,
    setEditImg,
    setImgUrl,
  };

  return (
    <PostingContainer>
      <MainTitle>Daily Log</MainTitle>
      <FileUpload {...fileuploadPros} />
      <Area>
        <SubTitle>오늘 한 일</SubTitle>
        <TextArea onChange={onChangeSimple} />
      </Area>
      <Area>
        <SubTitle>오늘 느낀 감정</SubTitle>
        <TextArea onChange={onChangeMind} bgColor='red' />
      </Area>
      <AlignRight>
        <Button onClick={onSubmit}>Save & Analysis</Button>
      </AlignRight>
    </PostingContainer>
  );
}

export default Posting;
