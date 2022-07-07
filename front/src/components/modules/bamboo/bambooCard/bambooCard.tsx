import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import { getBambooList } from 'api/api';
import BambooView from '../bambooView/bambooView';
import Modal from '../modal/modal';
import { IMAGE } from 'utils/image';
import Loader from 'components/modules/loader/Loader';
import {
  DiaryPosts,
  DiaryPost,
  Date,
  Title,
  PreviewPost,
} from './bambooCard.style';

function BambooCard() {
  const { ref, inView } = useInView();
  const [isOpenModal, setOpenModal] = useState<boolean>(false);

  const onClickToggleModal = useCallback(() => {
    setOpenModal(!isOpenModal);
  }, [isOpenModal]);

  const [bambooList, setBambooList] = useState<any[]>([]);
  const [page, setPage] = useState(1); //현재 페이지
  const [isLast, setIsLast] = useState(false);
  const [loading, setLoading] = useState(false);
  const [curItem, setCurItem] = useState<any[]>([]);

  useEffect(() => {
    if (inView) getPost();
  }, [inView]);

  const getPost = useCallback(async () => {
    setLoading(true);
    const data = await getBambooList(page);
    try {
      if (data.length > 0) {
        setPage((cur) => cur + 1);
        setBambooList((prev) => [...prev, ...data]);
        setLoading(false);
        setIsLast(false);
      } else {
        setIsLast(true);
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
    }
  }, [page]);

  const onView = (id: any) => {
    setCurItem(bambooList.find((item) => item._id === id));
  };

  return (
    <>
      <DiaryPosts>
        {bambooList &&
          bambooList.map((item: any) => (
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
      </DiaryPosts>
      {loading && <Loader>로딩 중</Loader>}
      {!isLast && <div ref={ref}></div>}
      {isOpenModal && (
        <Modal onClickToggleModal={onClickToggleModal}>
          <BambooView curItem={curItem} modalClose={onClickToggleModal} />
        </Modal>
      )}
    </>
  );
}

export default BambooCard;
