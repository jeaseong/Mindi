import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
  DiaryPosts,
  DiaryPost,
  Date,
  Title,
  PreviewPost,
} from './bambooCard.style';
import { IMAGE } from 'utils/image';
import { getBambooList } from 'api/api';
import Modal from '../modal/modal';
import BambooView from '../bambooView/bambooView';
import Loader from 'components/modules/loader/Loader';

function BambooCard() {
  const [isOpenModal, setOpenModal] = useState<boolean>(false);

  const onClickToggleModal = useCallback(() => {
    setOpenModal(!isOpenModal);
  }, [isOpenModal]);

  const [bambooList, setBambooList] = useState<any[]>([]);
  const [page, setPage] = useState(1); //현재 페이지
  const [loading, setLoading] = useState(false);
  const [curItem, setCurItem] = useState<any[]>([]);

  const observeRef = useRef(null);
  const preventRef = useRef(true); //옵저버 중복 실행 방지

  const handleObserver = useCallback(async (entries: any) => {
    const target = entries[0];
    if (target.isIntersecting && preventRef.current) {
      preventRef.current = false; //옵저버 중복 실행 방지
      console.log('is InterSecting');
      setPage((prev) => prev + 1); //페이지 값 증가
    }
  }, []);

  const options = {
    root: null, //기본 null, 관찰대상의 부모요소를 지정
    rootMargin: '20px', // 관찰하는 뷰포트의 마진 지정
    threshold: 1.0, // 관찰요소와 얼만큼 겹쳤을 때 콜백을 수행하도록 지정하는 요소
  };

  const getPost = useCallback(async () => {
    console.log('포스트 불러오기');
    setLoading(true);
    const data = await getBambooList(page);
    if (data) {
      setBambooList((prev) => [...prev, ...data]);
      preventRef.current = true;
    } else {
      console.log(data);
    }
    setLoading(false);
    // console.log(data);
    // console.log(page);
  }, [page]);

  useEffect(() => {
    getPost();
    const observer = new IntersectionObserver(handleObserver, options);
    if (observeRef.current) observer.observe(observeRef.current);
    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (page !== 1) getPost();
  }, [page]);

  console.log(bambooList);

  const onView = (id: any) => {
    setCurItem(bambooList.find((item) => item._id === id));
  };

  return (
    <DiaryPosts>
      {bambooList && (
        <>
          {bambooList.map((item: any, index: any) => (
            <DiaryPost key={item.date}>
              <Date>{item.createdAt.substr(0, 10)}</Date>
              <Title>{item.title}</Title>

              <PreviewPost
                onClick={() => {
                  onClickToggleModal();
                  onView(item._id);
                }}
                bgImg={IMAGE.AUTH_LOGO.url}
              >
                {item.content}
              </PreviewPost>
            </DiaryPost>
          ))}
        </>
      )}

      {loading ? <Loader>로딩 중</Loader> : <></>}
      <div ref={observeRef} style={{ height: '100px' }}></div>
      {isOpenModal && (
        <>
          <Modal onClickToggleModal={onClickToggleModal}>
            <BambooView curItem={curItem} modalClose={onClickToggleModal} />
          </Modal>
        </>
      )}
    </DiaryPosts>
  );
}

export default BambooCard;
