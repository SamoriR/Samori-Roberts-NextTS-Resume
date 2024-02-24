import Link from 'next/link';
import React, { ReactNode } from 'react';

const CardLink = ({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children?: ReactNode;
}) => (
  <>
    <div className="absolute -inset-y-6 -inset-x-4 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/50 sm:-inset-x-6 sm:rounded-2xl" />
    <Link href={href} className={className}>
      <span className="absolute -inset-y-6 -inset-x-4 z-20 sm:-inset-x-6 sm:rounded-2xl" />
      <span className="relative z-10">{children}</span>
    </Link>
  </>
);

export default CardLink;
