import React, { ReactNode } from 'react';
import CardLink from './CardLink';

const CardTitle = ({
  href,
  children,
}: {
  href?: string;
  children?: ReactNode;
}) => (
  <h2 className="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
    {href ? <CardLink href={href}>{children}</CardLink> : children}
  </h2>
);

export default CardTitle;
