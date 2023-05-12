import { LoginForm } from '@/types/LoginForm.type';
import { RecoilState, atom } from 'recoil';

export const LoginFormState: RecoilState<LoginForm> = atom<LoginForm>({
  key: 'LoginFormState',
  default: {
    userId: '',
    password: '',
  },
});
