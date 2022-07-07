import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useEditDiary, useGetDiaryList } from 'hooks/diaryQuery';
import { useSnackbarContext } from 'contexts/SnackbarContext';
import FileUpload from 'components/modules/fileUpload/FileUpload';
import Loader from 'components/modules/loader/Loader';
import Text from 'components/atoms/text/Text';
import MainTitle from 'components/atoms/text/MainTitle';
import TextArea from 'components/atoms/textArea/TextArea';
import Button from 'components/atoms/button/Button';
import SubTitle from 'components/atoms/text/SubTitle';
import { FileType, DiaryType } from 'types/atoms';
import { IMAGE } from 'utils/image';
import {
  PostingContainer,
  Area,
  AlignRight,
  Hilight,
} from 'components/modules/diary/posting/Posting.style';

function EditDiary() {
  const { diaryDate } = useParams<{ diaryDate: string }>();
  const { openSnackBar } = useSnackbarContext();
  const putDiary = useEditDiary(openSnackBar, diaryDate as string);
  const { diary, isLoading } = useGetDiaryList(diaryDate as string, 'day');
  const [isLoader, setIsLoader] = useState(false);
  const [simpleDiary, setSimpleDiary] = useState<string>('');
  const [mindDiary, setMindDiary] = useState<string>('');
  const [editImg, setEditImg] = useState<FileType>({
    preview: `${IMAGE.IMG_UPLOAD_BASIC.url}`,
    data: undefined,
  });

  useEffect(() => {
    console.log('이거 왜 렌더링 안 해?');
    initState();
  }, []);

  const initState = () => {
    if (!isLoading) {
      setSimpleDiary(diary[0]?.diary);
      setMindDiary(diary[0]?.feeling);
      if ('imageFilePath' in diary[0]) {
        setEditImg((cur) => {
          return {
            ...cur,
            ['preview']: diary[0]?.imageFilePath,
            ['data']: diary[0]?.imageFilePath,
          };
        });
      }
    }
  };

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
    setIsLoader((cur) => !cur);
  }, [isLoading]);

  const onSubmit = async () => {
    const diaryData: DiaryType = {
      _id: diary[0]._id,
      diary: simpleDiary,
      feeling: mindDiary,
      diaryDate: diaryDate as string,
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

  if (isLoader) return <Loader>일기를 분석하고 있습니다...</Loader>;
  if (isLoading) return <Loader>일기를 가져오고 있습니다...</Loader>;
  return (
    <PostingContainer>
      <MainTitle>Daily Log Edit</MainTitle>
      <FileUpload {...fileuploadPros} />
      <Text size='sm'>
        필수: <Hilight>50자 이상</Hilight> 작성해 주세요!
      </Text>
      <Area>
        <SubTitle>오늘 있었던 일을 적어주세요.</SubTitle>
        <TextArea value={simpleDiary} onChange={onChangeSimple} />
        <Text align='right'>글자수: {simpleDiary.length}</Text>
      </Area>
      <Text size='sm'>
        필수: <Hilight>50자 이상</Hilight> 작성해 주세요!
      </Text>
      <Area>
        <SubTitle mb='lg'>오늘 느낀을 적어주세요.</SubTitle>
        <Text size='sm'>
          <Hilight>ex&#41;</Hilight> 행복, 슬픔, 우울 - X
        </Text>
        <Text size='sm'>
          <Hilight>ex&#41;</Hilight> 길을 걷다 떨어지는 단풍을 보며 행복한
          기분을 느꼈다. 그 때의 기억이 떠올랐다. - O
        </Text>
        <TextArea value={mindDiary} onChange={onChangeMind} bgColor='red' />
        <Text align='right'>글자수: {mindDiary.length}</Text>
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
