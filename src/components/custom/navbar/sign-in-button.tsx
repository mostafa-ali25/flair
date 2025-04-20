'use client';

import { useTransition } from 'react';

import { Icons } from '@/components/icons/icons';
import { Button } from '@/components/ui/button';
import * as m from '@/paraglide/messages';

export const SignInButton = () => {
  const [isPending, startTransition] = useTransition();

  const handleSignIn = () => {
    startTransition(async () => {
      // await signIn('github');
      alert('Sign in with GitHub');
    });
  };

  return (
    <Button onClick={handleSignIn} disabled={isPending}>
      {isPending && <Icons.loader className="mr-2 size-4 animate-spin" />}
      {m.sign_in()}
    </Button>
  );
};
