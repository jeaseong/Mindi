import React, { useState, useMemo, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useSnackbarContext } from 'contexts/SnackbarContext';
import { usePostDiary } from 'hooks/diaryQuery';
import FileUpload from 'components/modules/fileUpload/FileUpload';
import Loader from 'components/modules/loader/Loader';
import Text from 'components/atoms/text/Text';
import MainTitle from 'components/atoms/text/MainTitle';
import TextArea from 'components/atoms/textArea/TextArea';
import Button from 'components/atoms/button/Button';
import SubTitle from 'components/atoms/text/SubTitle';
import { IMAGE } from 'utils/image';
import { FileType, DiaryType } from 'types/atoms';
import { PostingContainer, Area, AlignRight, Hilight } from './Posting.style';

function Posting() {
  const { diaryDate } = useParams<{ diaryDate: string }>();
  const { openSnackBar } = useSnackbarContext();
  const postDiary = usePostDiary(openSnackBar, diaryDate as string);
  const [isLoading, setIsLoading] = useState(false);
  const [simpleDiary, setSimpleDiary] = useState('');
  const [mindDiary, setMindDiary] = useState('');
  const [editImg, setEditImg] = useState<FileType>({
    preview: `${IMAGE.IMG_UPLOAD_BASIC.url}`,
    data: undefined,
  });

  const isCheck = simpleDiary.length >= 50 && mindDiary.length >= 50;

  const formData = useMemo(() => new FormData(), [editImg]);

  const onChangeSimple = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setSimpleDiary(e.target.value);
    },
    [],
  );

  const onChangeMind = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setMindDiary(e.target.value);
    },
    [],
  );

  const onChangeFile = useCallback((fileData: FileType) => {
    setEditImg(fileData);
  }, []);

  const onChangeLoading = useCallback(() => {
    setIsLoading((cur) => !cur);
  }, []);

  const onSubmit = async () => {
    const diaryData: DiaryType = {
      diary: simpleDiary,
      feeling: mindDiary,
      diaryDate: diaryDate as string,
    };
    formData.append('background', editImg.data as File);
    Object.entries(diaryData).forEach((val) => {
      formData.append(`${val[0]}`, val[1]);
    });
    postDiary.mutate(formData);
  };
  const fileuploadPros = {
    editImg,
    onChangeFile,
  };

  if (isLoading) return <Loader>일기를 분석하고 있습니다...</Loader>;

  return (
    <PostingContainer>
      <MainTitle>Daily Log</MainTitle>
      <FileUpload {...fileuploadPros} />
      <Text size='sm'>
        필수: <Hilight>50자 이상</Hilight> 작성해 주세요!
      </Text>
      <Area>
        <SubTitle>오늘 한 일</SubTitle>
        <TextArea onChange={onChangeSimple} />
        <Text align='right'>글자수: {simpleDiary.length}</Text>
      </Area>
      <Text size='sm'>
        필수: <Hilight>50자 이상</Hilight> 작성해 주세요!
      </Text>
      <Area>
        <SubTitle>오늘 느낀 감정</SubTitle>
        <TextArea onChange={onChangeMind} bgColor='red' />
        <Text align='right'>글자수: {mindDiary.length}</Text>
      </Area>
      <AlignRight>
        <Button
          disabled={!isCheck}
          size='lg'
          onClick={() => {
            onChangeLoading();
            onSubmit();
          }}
        >
          Save & Analysis
        </Button>
      </AlignRight>
    </PostingContainer>
  );
}

export default Posting;
