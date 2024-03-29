import React, { ReactElement, useMemo } from 'react';

const SocialLink = ({
  to,
  icon,
  children,
}: {
  to: string
  icon: ReactElement,
  children?: ReactElement | string,
}) => {
  const IconComponent = useMemo(() => React.cloneElement(icon, { className: 'h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300' }), [icon]);
  return (
    <a href={to} className="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500">
      {IconComponent}
      <span className="ml-4">{children}</span>
    </a>
  );
};

export default SocialLink;
