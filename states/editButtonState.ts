import { RecoilState, atom } from 'recoil';

export const EditButtonState: RecoilState<boolean> = atom<boolean>({
  key: 'editButtonState',
  default: false,
});
