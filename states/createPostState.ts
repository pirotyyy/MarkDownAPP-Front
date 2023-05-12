import { CreatePost } from '@/types/CreatePost.type';
import { RecoilState, atom } from 'recoil';

export const CreatePostState: RecoilState<CreatePost> = atom({
  key: 'createPostState',
  default: {
    userId: '',
    title: '',
    content: '',
  },
});
