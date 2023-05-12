import { RecoilState, atom } from 'recoil';

export const ImageState: RecoilState<File | null> = atom<File | null>({
  key: 'imageState',
  default: null,
});
