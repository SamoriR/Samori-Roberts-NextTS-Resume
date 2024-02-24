import React from 'react';

const CardDescription = (props: any) => {
  const { children } = props;
  return (
    <p className="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400">
      {children}
    </p>
  );
};

export default CardDescription;
