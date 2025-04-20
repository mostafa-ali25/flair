'use client';
import Link from 'next/link';
// import { useRouter } from 'next/router';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import {
  HomeIcon,
  UserIcon,
  UsersIcon,
  InfoIcon,
  SettingsIcon,
} from '@/components/icons/icons';

export function Sidebar() {
    // const router = useRouter();
    const pathname = usePathname();
  return (
    <nav
      className="flex flex-col h-screen bg-neutral-800 w-14 min-w-[56px] fixed  z-10"
      role="navigation"
      aria-label="Main navigation"
    >
      <Link href="/">
        <div className="mx-2 my-6">
          <Image
            src="/images/logo.svg"
            alt="Panel Logo"
            width={56}
            height={56}
            className="logo"
          />
        </div>
      </Link>
      <div className="flex flex-col flex-1 justify-between items-center p-2">
        <div className="flex flex-col gap-2">
          <Link href="/">
            <button
              className={`${pathname === '/' ? 'bg-neutral-700' : ''} flex items-center p-2 rounded-xl cursor-pointer hover:bg-neutral-700`}
              aria-label="Home"
            >
              <HomeIcon className="text-white" />
            </button>
          </Link>
          <Link href="/workforce">
            <button
            className={`${pathname.includes('/workforce')  ? 'bg-neutral-700' : ''} flex items-center p-2 rounded-xl cursor-pointer hover:bg-neutral-700`}
              aria-label="Profile"
            >
              <UserIcon className="text-white" />
            </button>
          </Link>
          <Link href="/teams">
            <button
className={`${pathname === '/teams' ? 'bg-neutral-700' : ''} flex items-center p-2 rounded-xl cursor-pointer hover:bg-neutral-700`}
              aria-label="Users"
            >
              <UsersIcon className="text-white" />
            </button>
          </Link>
        </div>

        <div className="flex flex-col gap-2">
          <button
            className="flex items-center p-2 rounded-xl cursor-pointer hover:bg-neutral-700"
            aria-label="Information"
          >
            <InfoIcon className="text-white" />
          </button>
          <button
            className="flex items-center p-2 rounded-xl cursor-pointer hover:bg-neutral-700"
            aria-label="Settings"
            title="Settings"
          >
            <SettingsIcon className="text-white" />
          </button>
        </div>
      </div>

      <div className="p-3">
        <Image
          src="/images/profile.png"
          alt="User profile"
          width={32}
          height={32}
          className="rounded-full"
        />
      </div>
    </nav>
  );
}
