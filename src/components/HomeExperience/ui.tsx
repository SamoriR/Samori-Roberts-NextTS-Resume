import React from 'react';

import { EASE_EMPH } from './constants';

interface DiamondProps {
  size?: number;
  color?: string;
  filled?: boolean;
  glow?: boolean;
  style?: React.CSSProperties;
}

export const Diamond = ({
  size = 5, color = '#cfe3ee', filled = true, glow = false, style,
}: DiamondProps) => (
  <div
    style={{
      width: size,
      height: size,
      transform: 'rotate(45deg)',
      flex: '0 0 auto',
      background: filled ? color : undefined,
      border: filled ? undefined : `1px solid ${color}`,
      boxShadow: glow ? `0 0 8px ${color}` : undefined,
      ...style,
    }}
  />
);

export const LogoCircle = ({
  src, size, fit = 'contain',
}: { src: string; size: number | string; fit?: 'cover' | 'contain' }) => (
  <div
    data-logo="1"
    style={{
      position: 'relative',
      width: size,
      height: size,
      borderRadius: '50%',
      border: '1px solid rgba(143,166,180,.4)',
      flex: '0 0 auto',
      overflow: 'hidden',
      transition: `width .65s ${EASE_EMPH}, height .65s ${EASE_EMPH}`,
    }}
  >
    <img
      src={src}
      alt=""
      style={{
        position: 'absolute',
        inset: fit === 'contain' ? '18%' : 0,
        width: fit === 'contain' ? '64%' : '100%',
        height: fit === 'contain' ? '64%' : '100%',
        objectFit: fit,
      }}
    />
  </div>
);
