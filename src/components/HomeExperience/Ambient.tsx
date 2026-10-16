import React from 'react';

import { rem } from './constants';

const EMBERS = [
  [12, 9, 0.2, 3], [24, 11, 2.5, 2], [37, 10, 1.1, 3], [49, 12, 4, 2],
  [58, 9.5, 0.7, 3], [68, 10.5, 3.2, 2], [79, 11.5, 1.8, 3], [90, 9, 5, 2],
].map(([left, dur, delay, size]) => ({
  left: `${left}%`, dur: `${dur}s`, delay: `${delay}s`, size,
}));

interface AmbientProps {
  glow: string;
  mist: string;
  ember: string;
  play: 'running' | 'paused';
}

const Ambient = ({
  glow, mist, ember, play,
}: AmbientProps) => (
  <>
    {/* Corner glow */}
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        backgroundColor: glow,
        WebkitMaskImage: 'linear-gradient(225deg, rgba(0,0,0,.22) 0%, rgba(0,0,0,.08) 28%, transparent 55%)',
        maskImage: 'linear-gradient(225deg, rgba(0,0,0,.22) 0%, rgba(0,0,0,.08) 28%, transparent 55%)',
        transition: 'background-color 1.4s ease',
      }}
    />
    {/* Diagonal beam */}
    <div
      className="amb-anim"
      style={{
        position: 'absolute',
        top: '-30%',
        right: '-14%',
        width: rem(360),
        height: '280%',
        pointerEvents: 'none',
        transform: 'rotate(35deg)',
        transformOrigin: 'top right',
        filter: `blur(${rem(14)})`,
        animation: 'pulse 7s ease-in-out infinite',
        animationPlayState: play,
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          clipPath: 'polygon(38% 0, 62% 0, 100% 100%, 0 100%)',
          backgroundColor: glow,
          WebkitMaskImage: 'linear-gradient(90deg, transparent, rgba(0,0,0,.17) 35%, rgba(0,0,0,.17) 65%, transparent)',
          maskImage: 'linear-gradient(90deg, transparent, rgba(0,0,0,.17) 35%, rgba(0,0,0,.17) 65%, transparent)',
          transition: 'background-color 1.4s ease',
        }}
      />
    </div>
    {/* Bottom mist */}
    <div
      className="amb-anim"
      style={{
        position: 'absolute',
        left: '-20%',
        right: '-20%',
        bottom: '-10%',
        height: '55%',
        backgroundColor: mist,
        WebkitMaskImage: 'radial-gradient(ellipse at 30% 70%, rgba(0,0,0,.32), transparent 60%), radial-gradient(ellipse at 75% 80%, rgba(0,0,0,.24), transparent 55%)',
        maskImage: 'radial-gradient(ellipse at 30% 70%, rgba(0,0,0,.32), transparent 60%), radial-gradient(ellipse at 75% 80%, rgba(0,0,0,.24), transparent 55%)',
        transition: 'background-color 1.4s ease',
        animation: 'mist 18s ease-in-out infinite',
        animationPlayState: play,
        pointerEvents: 'none',
      }}
    />
    {/* Embers */}
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      {EMBERS.map((em) => (
        <div
          key={em.left}
          className="amb-anim"
          style={{
            position: 'absolute',
            left: em.left,
            bottom: rem(-4),
            width: rem(em.size),
            height: rem(em.size),
            borderRadius: '50%',
            background: ember,
            boxShadow: `0 0 ${rem(6)} ${ember}`,
            transition: 'background 1.4s ease, box-shadow 1.4s ease',
            animation: `drift ${em.dur} linear ${em.delay} infinite both`,
            animationPlayState: play,
          }}
        />
      ))}
    </div>
  </>
);

export default Ambient;
