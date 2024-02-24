import React from 'react';
import CardLink from './CardLink';

const CardTitle = (props: any) => {
  const { as: Component = 'h2', href, children } = props;
  return (
    <Component className="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
      {href ? <CardLink to={href}>{children}</CardLink> : children}
    </Component>
  );
};

export default CardTitle;
