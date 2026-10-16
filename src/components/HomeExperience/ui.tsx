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

export const NavChevron = ({ flip = false }: { flip?: boolean }) => (
  <svg
    width={40}
    height={40}
    viewBox="0 0 60 60"
    style={{
      filter: 'drop-shadow(0 0 4px rgba(207,227,238,.45))',
      transform: flip ? 'scaleX(-1)' : undefined,
    }}
    aria-hidden
  >
    <circle cx={30} cy={30} r={27} fill="none" stroke="#8fa6b4" strokeWidth={1.2} />
    <circle cx={30} cy={30} r={22} fill="none" stroke="rgba(143,166,180,.35)" strokeWidth={1} />
    <path d="M34 20 L22 30 L34 40" fill="none" stroke="#eef3f6" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
    <rect x={27} y={1} width={6} height={6} transform="rotate(45 30 4)" fill="#cfe3ee" />
    <rect x={27} y={53} width={6} height={6} transform="rotate(45 30 56)" fill="#cfe3ee" />
  </svg>
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
