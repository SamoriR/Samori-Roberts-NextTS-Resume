import React from 'react';
import { ChevronRightIcon } from '@heroicons/react/20/solid';

const CardMoreLink = (props: any) => {
  const { children } = props;
  return (
    <div
      aria-hidden="true"
      className="relative z-10 mt-4 flex items-center text-sm font-medium text-teal-500"
    >
      {children}
      <ChevronRightIcon className="ml-1 h-4 w-4 stroke-current" />
    </div>
  );
};

export default CardMoreLink;
