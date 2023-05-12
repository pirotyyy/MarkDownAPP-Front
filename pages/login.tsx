import LoginForm from '@/features/LoginForm/LoginForm';
import React from 'react';

import styles from '@/styles/Login.module.scss';
import { NextPage } from 'next';

const Login: NextPage = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
