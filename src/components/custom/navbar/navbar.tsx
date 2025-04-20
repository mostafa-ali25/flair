import { ThemeSwitcher } from '@/components/custom/theme-switcher';
// import { LanguageSwitcher } from './language-switcher';
import { LanguageSwitcher } from '@/components/custom/navbar/language-switcher';
import { SignInButton } from '@/components/custom/navbar/sign-in-button';
import { UserDropdown } from '@/components/custom/navbar/user-dropdown';
import { Link } from '@/lib/i18n';
import * as m from '@/paraglide/messages';

export const Navbar = async () => {
  const session = null;

  return (
    <header className="  border-r">
      <div className="flex flex-col h-full items-center justify-between">
        <Link href="/" className="font-mono text-lg font-bold">
          {m.app_name()}  
        </Link>
        <div className="flex flex-col items-center gap-2">
          <ThemeSwitcher className="absolute_bottom-5_right-5_z-10" />
          <LanguageSwitcher />
          {session ? <UserDropdown session={session} /> : <SignInButton />}
        </div>
      </div>
    </header>
  );
};
