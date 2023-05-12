import { AuthUser } from '@/types/AuthUser.type';
import { RecoilState, atom } from 'recoil';

export const AuthUserState: RecoilState<AuthUser> = atom<AuthUser>({
  key: 'authUserState',
  default: {
    userId: '',
    isLogin: false,
  },
});
