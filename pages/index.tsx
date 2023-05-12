import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.scss';
import Header from '@/components/Layouts/Header/Header';
import { apiClient } from '@/lib/apiClient';
import Post from '@/features/Post/Post';
import { useRecoilState, useRecoilValue } from 'recoil';
import { PostListState } from '@/states/postListState';
import { useEffect } from 'react';
import { AuthUserState } from '@/states/authUserState';
import { useRouter } from 'next/router';
import { NextPage } from 'next';

const Home: NextPage = () => {
  const [postList, setPostList] = useRecoilState(PostListState);
  const authUser = useRecoilValue(AuthUserState);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      if (!authUser.isLogin) {
        router.push('/login');
      }
    };
    const fetchList = async () => {
      const response = await apiClient.get('md/list');
      setPostList(response.data);
    };
    checkAuth();
    fetchList();
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.top}>
          <Header />
        </div>
        <div className={styles.main}>
          {postList ? (
            postList.map((post) => <Post key={post.mdId} post={post} />)
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
