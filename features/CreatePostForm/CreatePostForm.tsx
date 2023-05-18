import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';

import styles from './CreatePostForm.module.scss';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { useRecoilState, useRecoilValue } from 'recoil';
import { apiClient } from '@/lib/apiClient';
import { CreatePostState } from '@/states/createPostState';
import { AuthUserState } from '@/states/authUserState';
import { useRouter } from 'next/router';
import { BsImageFill } from 'react-icons/bs';
import { ImageState } from '@/states/imageState';

const CreatePostForm = () => {
  const [createPost, setCreatePost] = useRecoilState(CreatePostState);
  const authUser = useRecoilValue(AuthUserState);
  const router = useRouter();

  useEffect(() => {
    setCreatePost({
      userId: '',
      title: '',
      content: '',
    });
  }, []);

  const handleCreateSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await apiClient.post('md/save', {
        userId: authUser.userId,
        title: createPost.title,
        content: createPost.content,
      });
      setCreatePost({ userId: '', title: '', content: '' });
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const imageFile = e.target.files![0];

    try {
      const imageUrl = await uploadImage(imageFile);
      const tmpContent = createPost.content;
      const newContent = `${tmpContent}\n ![${imageFile.name}](${imageUrl})\n`;
      setCreatePost({ ...createPost, content: newContent });
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

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <form onSubmit={handleCreateSubmit}>
          <input
            type='text'
            value={createPost.title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setCreatePost({ ...createPost, title: e.target.value });
            }}
            className={styles.title}
            placeholder='記事タイトル'
          />
          <div className={styles.mdArea}>
            <div className={styles.inputArea}>
              <div className={styles.optionList}>
                <label htmlFor='image' className={styles.image}>
                  <img src='/img/image.png' alt='' className={styles.icon} />
                </label>
              </div>
              <input
                id='image'
                type='file'
                name='image'
                className={styles.imgForm}
                onChange={handleOnChange}
              />
              <textarea
                value={createPost.content}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                  setCreatePost({ ...createPost, content: e.target.value });
                }}
                className={styles.inputArea}
              />
            </div>
            <div className={styles.prevArea}>
              <ReactMarkdown className={styles.md}>
                {createPost.content}
              </ReactMarkdown>
            </div>
          </div>
          <hr />
          <input type='submit' value='投稿' className={styles.btn} />
        </form>
      </div>
    </div>
  );
};

export default CreatePostForm;
