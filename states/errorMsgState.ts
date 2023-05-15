import { atom } from 'recoil';

export const ErrorMsgState = atom<string>({
  key: 'errorMsgState',
  default: '',
});
