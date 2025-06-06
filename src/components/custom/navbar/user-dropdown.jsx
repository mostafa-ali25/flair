'use client';

import { useState } from 'react';
import Image from 'next/image';

import { Icons } from '@/components/icons/icons';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import * as m from '@/paraglide/messages';

export const UserDropdown = ({ session: { user } }) => {
  const [isPending, setIsPending] = useState(false);

  const handleCreateCheckoutSession = async () => {
    setIsPending(true);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Image
          className="overflow-hidden rounded-full"
          src={`${user?.image}`}
          alt={`${user?.name}`}
          width={32}
          height={32}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{m.my_account()}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="flex flex-col items-center justify-center p-2">
          <Image
            className="overflow-hidden rounded-full"
            src={`${user?.image}`}
            alt={`${user?.name}`}
            width={100}
            height={100}
          />
          <h2 className="py-2 text-lg font-bold">{user?.name}</h2>
          <Button
            onClick={handleCreateCheckoutSession}
            disabled={user?.isActive || isPending}
            className="w-64"
          >
            {user?.isActive ? (
              m.you_are_a_pro()
            ) : (
              <>
                {isPending && (
                  <Icons.loader className="mr-2 size-4 animate-spin" />
                )}
                {m.upgrade_to_pro_cta()}
              </>
            )}
          </Button>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => alert('signed Out')}>
          <Icons.logOut className="mr-2 size-4" /> <span>{m.log_out()}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
