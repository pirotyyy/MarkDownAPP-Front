import SignUpForm from '@/features/SignUpForm/SingUpForm';
import React from 'react';

import styles from '@/styles/SignUp.module.scss';
import { NextPage } from 'next';

const Signup: NextPage = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <SignUpForm />
      </div>
    </div>
  );
};

export default Signup;
