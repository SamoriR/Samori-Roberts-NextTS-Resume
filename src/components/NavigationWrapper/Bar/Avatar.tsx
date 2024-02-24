import React from 'react';
import Link from 'next/link';
import classnames from 'classnames';
import avatarImage from '@/images/avatar-2.jpg';

export const AvatarContainer = (props: any) => {
  const { className, style, children } = props;

  return (
    <div
      className={classnames(
        className,
        'h-10 w-10 rounded-full bg-white/90 p-0.5 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:ring-white/10',
      )}
      style={style}
    >
      { children }
    </div>
  );
};

export const AvatarIcon = (props: any) => {
  const { large = false, className, style } = props;
  return (
    <Link
      href="/"
      aria-label="Home"
      className={classnames(className, 'pointer-events-auto')}
      style={style}
    >
      <img
        src={avatarImage.src}
        alt=""
        sizes={large ? '4rem' : '2.25rem'}
        className={classnames(
          'rounded-full bg-zinc-100 object-cover dark:bg-zinc-800',
          large ? 'h-16 w-16' : 'h-9 w-9',
        )}
      />
    </Link>
  );
};

const Avatar = () => (
  <AvatarContainer>
    <AvatarIcon />
  </AvatarContainer>
);

export default Avatar;
