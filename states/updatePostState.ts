import { UpdatePost } from '@/types/UpdatePost.type';
import { RecoilState, atom } from 'recoil';

export const UpdatePostState: RecoilState<UpdatePost> = atom<UpdatePost>({
  key: 'updatePostState',
  default: {
    mdId: '',
    title: '',
    content: '',
  },
});
