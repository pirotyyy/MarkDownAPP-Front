import React, { FormEvent } from 'react';
import styles from './LoginForm.module.scss';
import { useRecoilState } from 'recoil';
import { LoginFormState } from '@/states/LoginFormState';
import { apiClient } from '@/lib/apiClient';
import { useRouter } from 'next/router';
import { AuthUserState } from '@/states/authUserState';
import Link from 'next/link';

const LoginForm = () => {
  const [loginForm, setLoginForm] = useRecoilState(LoginFormState);
  const [authUser, setAuthUser] = useRecoilState(AuthUserState);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await apiClient.post('auth/login', loginForm);
      setAuthUser({
        userId: loginForm.userId,
        isLogin: true,
      });
      setLoginForm({ userId: '', password: '' });
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.left}>
          <img src='img/login.jpg' alt='' />
        </div>
        <div className={styles.right}>
          <div className={styles.title}>ログイン</div>
          <form onSubmit={handleSubmit}>
            <div className={styles.inputForm}>
              <input
                type='text'
                placeholder='ユーザーID'
                value={loginForm.userId}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setLoginForm({ ...loginForm, userId: e.target.value });
                }}
              />
              <input
                type='password'
                placeholder='パスワード'
                value={loginForm.password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setLoginForm({ ...loginForm, password: e.target.value });
                }}
              />
            </div>
            <input type='submit' value='ログイン' className={styles.loginBtn} />
          </form>
          <Link href='/signup'>
            <div>アカウント登録</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
