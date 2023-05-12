import React, { useEffect, useState } from 'react';

import styles from './Post.module.scss';
import Link from 'next/link';
import { PostInfo } from '@/types/PostInfo.type';
import { apiClient } from '@/lib/apiClient';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import { PostListState } from '@/states/postListState';

type Props = {
  post: PostInfo;
};

const Post = ({ post }: Props) => {
  const setPostList = useSetRecoilState(PostListState);
  const [optionButton, setOptionButton] = useState(false);
  const [profImg, setProfImg] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchProfImg = async () => {
      try {
        const response = await apiClient.get(`user/${post.userId}/detail`);
        setProfImg(response.data.profileImg);
      } catch (error) {
        throw error;
      }
    };
    fetchProfImg();
  }, []);

  const handleClick = () => {
    setOptionButton(optionButton ? false : true);
  };

  const handleDelete = async () => {
    try {
      await apiClient.delete(`md/${post.mdId}`);
      const response = await apiClient.get('md/list');
      setPostList(response.data);
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.topLeft}>
            <img src={profImg} alt='' />
            <div className={styles.userInfo}>
              <Link href='/' className={styles.userId}>
                <p>@{post.userId}</p>
              </Link>
              <p className={styles.postDate}>{post.createdAt}</p>
            </div>
          </div>
          <div className={styles.topRight}>
            <div className={styles.edit}>
              <img src='/img/3points.png' alt='' onClick={handleClick} />
              {optionButton ? (
                <>
                  <Link
                    href={`/drafts/edit/${post.mdId}/`}
                    className={styles.editBtn}
                  >
                    編集する
                  </Link>
                  <input
                    type='button'
                    className={styles.deleteBtn}
                    value='削除する'
                    onClick={handleDelete}
                  />
                </>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </div>
        <div className={styles.main}>
          <Link
            href='/note/[mdId]/'
            as={`/note/${post.mdId}`}
            className={styles.title}
          >
            <span>{post.title}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Post;
