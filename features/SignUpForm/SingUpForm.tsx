import React, { ChangeEvent, FormEvent } from 'react';

import styles from './SignUpForm.module.scss';
import { useRecoilState } from 'recoil';
import { SignUpFormState } from '@/states/signUpFormState';
import { useRouter } from 'next/router';
import { apiClient } from '@/lib/apiClient';

import { ImageSrcState } from '@/states/imageSrcState';
import { ImageState } from '@/states/imageState';
import Link from 'next/link';

const SignUpForm = () => {
  const [signUpForm, setSignUpForm] = useRecoilState(SignUpFormState);
  const [image, setImage] = useRecoilState(ImageState);
  const [imageSrc, setImageSrc] = useRecoilState(ImageSrcState);
  const router = useRouter();

  const handleOnChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const imageFile = e.target.files![0];
    setImage(imageFile);

    if (imageFile) {
      setImageSrc(URL.createObjectURL(imageFile));
    }

    try {
      const imageUrl = await uploadImage(imageFile);
      setSignUpForm({ ...signUpForm, profileImg: imageUrl });
    } catch (error) {
      console.log(error);
    }
  };

  const uploadImage = async (image: File) => {
    const formData = new FormData();
    formData.append('image', image);

    try {
      // profimage upload
      const response = await apiClient.post('image/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data; charset=utf-8' },
      });

      const imageUrl = response.data;
      return imageUrl;
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(signUpForm);
    try {
      await apiClient.post('user', signUpForm);
      setSignUpForm({
        userId: '',
        email: '',
        username: '',
        password: '',
        profileImg: '',
      });
      router.push('/login');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.left}>
          <img src='img/register.jpg' alt='' />
        </div>
        <div className={styles.right}>
          <div className={styles.title}>サインアップ</div>
          <form onSubmit={handleSubmit}>
            <div className={styles.inputForm}>
              {imageSrc ? (
                <div className={styles.iconWrapper}>
                  <label htmlFor='image'>
                    <img src={imageSrc} alt='' className={styles.icon} />
                  </label>
                </div>
              ) : (
                <div className={styles.iconWrapper}>
                  <label htmlFor='image'>
                    <img src='/img/icon.png' alt='' className={styles.icon} />
                  </label>
                </div>
              )}
              <input
                id='image'
                type='file'
                name='image'
                className={styles.imgForm}
                onChange={handleOnChange}
              />
              <input
                type='text'
                placeholder='ユーザーID'
                value={signUpForm.userId}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setSignUpForm({ ...signUpForm, userId: e.target.value });
                }}
                className={styles.profForm}
              />
              <input
                type='text'
                placeholder='Eメール'
                value={signUpForm.email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setSignUpForm({ ...signUpForm, email: e.target.value });
                }}
                className={styles.profForm}
              />
              <input
                type='text'
                placeholder='ユーザー名'
                value={signUpForm.username}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setSignUpForm({ ...signUpForm, username: e.target.value });
                }}
                className={styles.profForm}
              />
              <input
                type='password'
                placeholder='パスワード'
                value={signUpForm.password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setSignUpForm({ ...signUpForm, password: e.target.value });
                }}
                className={styles.profForm}
              />
            </div>
            <input
              type='submit'
              value='サインアップ'
              className={styles.signUpBtn}
            />
          </form>
          <Link href='/login'>
            <div>ログイン</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
