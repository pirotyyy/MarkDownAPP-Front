import { RecoilState, atom } from 'recoil';

export const ImageSrcState: RecoilState<string | null> = atom<string | null>({
  key: 'imageSrcState',
  default: null,
});
