import { signInWithEmailAndPassword } from 'firebase/auth';

import { UserLogin } from '@/entities/user/types/auth';
import { firebaseApi } from '@/shared/api';

export async function signInEmail({ email, password }: UserLogin) {
  await signInWithEmailAndPassword(firebaseApi.auth, email, password);
}
