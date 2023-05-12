import React, { useEffect, useState } from 'react';

import styles from '@/styles/Note.module.scss';
import Header from '@/components/Layouts/Header/Header';
import { GetServerSideProps } from 'next';
import { apiClient } from '@/lib/apiClient';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import Link from 'next/link';
import { useRecoilState } from 'recoil';
import { PostState } from '@/states/postState';
import { useRouter } from 'next/router';

const Note = () => {
  const [post, setPost] = useRecoilState(PostState);
  const [profImg, setProfImg] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchPostInfo = async () => {
      const { mdId } = router.query;
      const resPost = await apiClient.get(`md/${mdId}/detail`);
      const resProfImg = await apiClient.get(
        `user/${resPost.data.userId}/detail`
      );
      setPost(resPost.data);
      setProfImg(resProfImg.data.profileImg);
    };
    fetchPostInfo();
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.top}>
          <Header />
        </div>
        <div className={styles.main}>
          {post.content == '' ? (
            <div>loading</div>
          ) : (
            <>
              <div className={styles.head}>
                <div className={styles.userInfo}>
                  <img src={profImg} alt='' className={styles.profImg} />
                  <Link href='/' className={styles.userId}>
                    <p>@{post.userId}</p>
                  </Link>
                </div>
                <p className={styles.postDate}>投稿日: {post.createdAt}</p>
              </div>
              <div className={styles.postInfo}>
                <div className={styles.title}>{post.title}</div>
              </div>
              <div className={styles.md}>
                <ReactMarkdown>{post.content}</ReactMarkdown>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Note;
