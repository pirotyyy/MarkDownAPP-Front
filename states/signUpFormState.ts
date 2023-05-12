import { SignUpForm } from '@/types/SignUpForm.type';
import { RecoilState, atom } from 'recoil';

export const SignUpFormState: RecoilState<SignUpForm> = atom<SignUpForm>({
  key: 'signUpFormState',
  default: {
    userId: '',
    email: '',
    username: '',
    password: '',
    profileImg: '',
  },
});
