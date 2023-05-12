import React, { useEffect } from 'react';

import styles from '@/styles/New.module.scss';
import Header from '@/components/Layouts/Header/Header';
import CreatePostForm from '@/features/CreatePostForm/CreatePostForm';
import { NextPage } from 'next';

const New: NextPage = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.top}>
          <Header />
        </div>
        <div className={styles.main}>
          <CreatePostForm />
        </div>
      </div>
    </div>
  );
};

export default New;
