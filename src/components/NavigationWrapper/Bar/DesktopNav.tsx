import React from 'react';
import classnames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavItem = (props: any) => {
  const { to, children } = props;
  const pathname = usePathname();

  const isActive = pathname === to;

  return (
    <li>
      <Link
        href={to}
        className={classnames(
          'relative block px-3 py-2 transition',
          isActive
            ? 'text-teal-500 dark:text-teal-400'
            : 'hover:text-teal-500 dark:hover:text-teal-400',
        )}
      >
        {children}
        {isActive && (
          <span className="absolute inset-x-1 -bottom-px h-px bg-gradient-to-r from-teal-500/0 via-teal-500/40 to-teal-500/0 dark:from-teal-400/0 dark:via-teal-400/40 dark:to-teal-400/0" />
        )}
      </Link>
    </li>
  );
};

const DesktopNavBar = (props: any) => {
  const { className, routes } = props;

  return (
    <nav className={className}>
      <ul className="flex rounded-full bg-white/90 px-3 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10">
        {
          routes.map((route: string) => <NavItem key={route} to={`/${route}`}>{route}</NavItem>)
        }
      </ul>
    </nav>
  );
};

export default DesktopNavBar;
