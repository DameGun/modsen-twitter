import { signOut } from 'firebase/auth';

import { StyledButton } from '@/components/ui';
import { auth } from '@/services/firebase';

export function FeedPage() {
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <StyledButton onClick={handleLogout}>Logout</StyledButton>
    </div>
  );
}
