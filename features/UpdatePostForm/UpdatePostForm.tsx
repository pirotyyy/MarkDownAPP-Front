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
