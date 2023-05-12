import React, { useEffect } from 'react';

import styles from '@/styles/Edit.module.scss';
import Header from '@/components/Layouts/Header/Header';
import UpdatePostForm from '@/features/UpdatePostForm/UpdatePostForm';
import { GetServerSideProps, NextPage } from 'next';
import { apiClient } from '@/lib/apiClient';
import { useSetRecoilState } from 'recoil';
import { UpdatePostState } from '@/states/updatePostState';
import { useRouter } from 'next/router';

const Edit: NextPage = () => {
  const setUpdatePost = useSetRecoilState(UpdatePostState);
  const router = useRouter();

  useEffect(() => {
    const { mdId } = router.query;
    const fetch = async () => {
      const response = await apiClient.get(`md/${mdId}/detail`);
      setUpdatePost({
        mdId: response.data.mdId,
        title: response.data.title,
        content: response.data.content,
      });
    };
    fetch();
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.top}>
          <Header />
        </div>
        <div className={styles.main}>
          <UpdatePostForm />
        </div>
      </div>
    </div>
  );
};

export default Edit;
