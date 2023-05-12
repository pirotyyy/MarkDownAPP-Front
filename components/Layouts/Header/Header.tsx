import React from 'react';

import styles from './Header.module.scss';
import Link from 'next/link';
import { useRecoilValue } from 'recoil';
import { AuthUserState } from '@/states/authUserState';
import { apiClient } from '@/lib/apiClient';
import { useRouter } from 'next/router';

const Header = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await apiClient.post('auth/logout');
      console.log('logout successfully');
      router.push('/login');
    } catch (error) {
      console.log(error);
    }
  };

  const authUser = useRecoilValue(AuthUserState);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.left}>
          <Link href='/'>
            <div className={styles.title}>Marks</div>
          </Link>
        </div>
        <div className={styles.right}>
          <input
            type='text'
            className='styles.searchBar'
            placeholder='投稿を検索'
          />
          <Link href='/drafts/new/'>
            <div className={styles.postButton}>投稿する</div>
          </Link>
          {authUser.isLogin ? (
            <button onClick={handleLogout} className={styles.logoutBtn}>
              ログアウト
            </button>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
