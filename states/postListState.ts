import { PostInfo } from '@/types/PostInfo.type';
import { RecoilState, atom } from 'recoil';

export const PostListState: RecoilState<PostInfo[] | null> = atom<
  PostInfo[] | null
>({
  key: 'postListState',
  default: null,
});
