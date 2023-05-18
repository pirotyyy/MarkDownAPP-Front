import React, { ChangeEvent, FormEvent } from 'react';

import styles from './UpdatePostForm.module.scss';
import { useRecoilState } from 'recoil';
import { UpdatePostState } from '@/states/updatePostState';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { apiClient } from '@/lib/apiClient';
import { useRouter } from 'next/router';

const UpdatePostForm = () => {
  const [updatePost, setUpdatePost] = useRecoilState(UpdatePostState);
  const router = useRouter();

  const handleUpdateSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await apiClient.put(`md/${updatePost.mdId}`, {
        title: updatePost.title,
        content: updatePost.content,
      });
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const imageFile = e.target.files![0];

    try {
      const imageUrl = await uploadImage(imageFile);
      const tmpContent = updatePost.content;
      const newContent = `${tmpContent}\n ![${imageFile.name}](${imageUrl})\n`;
      setUpdatePost({ ...updatePost, content: newContent });
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
        <form onSubmit={handleUpdateSubmit}>
          <input
            type='text'
            value={updatePost.title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setUpdatePost({ ...updatePost, title: e.target.value });
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
                value={updatePost.content}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                  setUpdatePost({ ...updatePost, content: e.target.value });
                }}
                className={styles.inputArea}
              />
            </div>
            <div className={styles.prevArea}>
              <ReactMarkdown className={styles.md}>
                {updatePost.content}
              </ReactMarkdown>
            </div>
          </div>
          <hr />
          <input type='submit' value='保存' className={styles.btn} />
        </form>
      </div>
    </div>
  );
};

export default UpdatePostForm;
