import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import { useEditDiary } from 'hooks/diaryQuery';
import { useSnackbarContext } from 'contexts/SnackbarContext';
import FileUpload from 'components/modules/fileUpload/FileUpload';
import Loader from 'components/modules/loader/Loader';
import MainTitle from 'components/atoms/text/MainTitle';
import TextArea from 'components/atoms/textArea/TextArea';
import Button from 'components/atoms/button/Button';
import SubTitle from 'components/atoms/text/SubTitle';
import { FileType, DiaryType, CustomizedState } from 'types/atoms';
import { IMAGE } from 'utils/image';
import {
  PostingContainer,
  Area,
  AlignRight,
} from 'components/modules/diary/posting/Posting.style';

function EditDiary() {
  const location = useLocation();
  const state = location.state as CustomizedState;
  const { openSnackBar } = useSnackbarContext();
  const putDiary = useEditDiary(openSnackBar, state?.date);
  const queryClient = useQueryClient();
  const diary = queryClient.getQueryData(['diary', state?.date]) as any;
  const [isLoading, setIsLoading] = useState(false);
  const [simpleDiary, setSimpleDiary] = useState<string>('');
  const [mindDiary, setMindDiary] = useState<string>('');
  const [editImg, setEditImg] = useState<FileType>({
    preview: `${IMAGE.IMG_UPLOAD_BASIC.url}`,
    data: undefined,
  });

  useEffect(() => {
    initState();
  }, []);

  const initState = useCallback(() => {
    if (diary.length > 0) {
      setSimpleDiary(diary[0].diary);
      setMindDiary(diary[0].feeling);
    }
    if ('imageFilePath' in diary) {
      setEditImg((cur) => {
        return {
          ...cur,
          ['preview']: diary[0].imageFilePath,
          ['data']: diary[0].imageFilePath,
        };
      });
    }
  }, [simpleDiary, mindDiary, editImg]);

  const formData = useMemo(() => new FormData(), [editImg]);

  const onChangeSimple = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setSimpleDiary(e.target.value);
    },
    [simpleDiary],
  );

  const onChangeMind = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setMindDiary(e.target.value);
    },
    [mindDiary],
  );

  const onChangeFile = useCallback(
    (fileData: FileType) => {
      setEditImg(fileData);
    },
    [editImg],
  );

  const onChangeLoading = useCallback(() => {
    setIsLoading((cur) => !cur);
  }, [isLoading]);

  const onSubmit = async () => {
    const diaryData: DiaryType = {
      _id: diary[0]?._id,
      diary: simpleDiary,
      feeling: mindDiary,
      diaryDate: state?.date,
    };
    formData.append('background', editImg.data as File);
    Object.entries(diaryData).forEach((val) => {
      formData.append(`${val[0]}`, val[1]);
    });
    try {
      putDiary.mutate(diaryData);
    } catch (e) {
      openSnackBar(false, '작성을 안 했어요..!!');
      onChangeLoading();
    }
  };
  const fileuploadPros = {
    editImg,
    onChangeFile,
  };

  if (isLoading) return <Loader>일기를 분석하고 있습니다...</Loader>;

  return (
    <PostingContainer>
      <MainTitle>Daily Log Edit</MainTitle>
      <FileUpload {...fileuploadPros} />
      <Area>
        <SubTitle>오늘 한 일</SubTitle>
        <TextArea value={simpleDiary} onChange={onChangeSimple} />
      </Area>
      <Area>
        <SubTitle>오늘 느낀 감정</SubTitle>
        <TextArea value={mindDiary} onChange={onChangeMind} bgColor='red' />
      </Area>
      <AlignRight>
        <Button
          onClick={() => {
            onChangeLoading();
            onSubmit();
          }}
        >
          Edit & Analysis
        </Button>
      </AlignRight>
    </PostingContainer>
  );
}

export default EditDiary;
