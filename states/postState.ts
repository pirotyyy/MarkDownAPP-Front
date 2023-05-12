import { Post } from '@/types/Post.type';
import { RecoilState, atom } from 'recoil';

export const PostState: RecoilState<Post> = atom<Post>({
  key: 'postState',
  default: {
    mdId: '',
    title: '',
    userId: '',
    fileId: '',
    createdAt: '',
    content: '',
  },
});
