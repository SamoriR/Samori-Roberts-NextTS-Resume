import React from 'react';

import { Job } from '@/data/jobs';
import {
  CINZEL, CORMORANT, EASE_EMPH, mix,
} from './constants';
import { Diamond, LogoCircle } from './ui';

export type Phase = 'start' | 'full' | 'logo' | 'nav' | 'closing';

export interface DetState {
  job: Job;
  rect: { l: number; t: number; w: number; h: number; lx: number; ly: number };
  W: number;
  H: number;
  nav: { l: number; t: number };
  phase: Phase;
}

interface DetailsOverlayProps {
  det: DetState;
  onClose: () => void;
}

const DetailsOverlay = ({ det: d, onClose }: DetailsOverlayProps) => {
  const full = d.phase !== 'start';
  const navP = d.phase === 'nav';
  const inNav = d.phase === 'logo' || d.phase === 'nav' || d.phase === 'closing';
  const r = full ? {
    l: 0, t: 0, w: d.W, h: d.H,
  } : d.rect;
  const accent = mix(d.job.brand, '#cfe3ee', 70);
  let logoLeft: string;
  let logoTop: string;
  if (inNav) {
    logoLeft = `${d.nav.l}px`;
    logoTop = `${d.nav.t}px`;
  } else {
    logoLeft = full || !d.rect.lx ? '50%' : `calc(50% + ${d.rect.lx}px)`;
    logoTop = full || !d.rect.ly ? '50%' : `calc(50% + ${d.rect.ly}px)`;
  }
  let logoSize = 44;
  if (full) logoSize = 64;
  if (inNav) logoSize = 28;

  return (
    <div
      style={{
        position: 'absolute',
        zIndex: 4,
        left: r.l,
        top: r.t,
        width: r.w,
        height: r.h,
        borderRadius: full ? 0 : 3,
        boxSizing: 'border-box',
        border: '1px solid rgba(143,166,180,.5)',
        boxShadow: full ? '0 0 0 rgba(0,0,0,0)' : '0 12px 40px rgba(0,0,0,.7)',
        transition: `left .55s ${EASE_EMPH}, top .55s ${EASE_EMPH}, width .55s ${EASE_EMPH}, height .55s ${EASE_EMPH}, border-radius .55s ease, box-shadow .55s ease, opacity .5s ease`,
        opacity: d.phase === 'closing' ? 0 : 1,
        overflow: 'hidden',
        pointerEvents: 'auto',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(22,31,40,.985), rgba(7,10,14,.99))',
          opacity: full ? 0 : 1,
          transition: 'opacity .55s ease',
          pointerEvents: 'none',
        }}
      />
      <div style={{
        position: 'absolute', inset: 5, border: '1px solid rgba(143,166,180,.22)', pointerEvents: 'none',
      }}
      />
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 18,
          textAlign: 'center',
          fontFamily: CINZEL,
          fontSize: 9.5,
          fontWeight: 600,
          letterSpacing: '.1em',
          color: '#eef3f6',
          textTransform: 'uppercase',
          padding: '0 10px',
          opacity: full ? 0 : 1,
          transition: 'opacity .4s ease',
        }}
      >
        {d.job.title}
      </div>
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 16,
          textAlign: 'center',
          fontFamily: CINZEL,
          fontSize: 7.5,
          letterSpacing: '.22em',
          color: '#6f8390',
          textTransform: 'uppercase',
          opacity: full ? 0 : 1,
          transition: 'opacity .4s ease',
        }}
      >
        {d.job.type}
      </div>
      <div
        style={{
          position: 'absolute',
          left: logoLeft,
          top: logoTop,
          transform: inNav ? 'translate(0,0)' : 'translate(-50%,-50%)',
          transition: `left .65s ${EASE_EMPH}, top .65s ${EASE_EMPH}, transform .65s ${EASE_EMPH}`,
        }}
      >
        <Diamond
          filled={false}
          color="#8fa6b4"
          style={{
            position: 'absolute',
            right: 'calc(100% + 12px)',
            top: '50%',
            marginTop: -3,
            opacity: navP ? 1 : 0,
            transition: 'opacity .5s',
          }}
        />
        <LogoCircle src={d.job.logo} size={logoSize} fit={d.job.logoFit} />
      </div>
      <button
        type="button"
        onClick={onClose}
        tabIndex={navP ? 0 : -1}
        style={{
          position: 'absolute',
          right: 26,
          top: 24,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          cursor: 'pointer',
          outline: 'none',
          background: 'none',
          border: 'none',
          padding: 0,
          opacity: navP ? 1 : 0,
          pointerEvents: navP ? 'auto' : 'none',
          transition: 'opacity .6s ease',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.opacity = '.7'; }}
        onMouseLeave={(e) => { e.currentTarget.style.opacity = navP ? '1' : '0'; }}
      >
        <Diamond glow />
        <span style={{
          fontFamily: CINZEL, fontSize: 11, letterSpacing: '.24em', color: '#eef3f6',
        }}
        >
          RETURN
        </span>
        <span style={{ fontFamily: CORMORANT, fontSize: 12, color: '#6f8390' }}>esc</span>
      </button>
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 84,
          bottom: 34,
          padding: '0 64px',
          boxSizing: 'border-box',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px 56px',
          opacity: navP ? 1 : 0,
          pointerEvents: navP ? 'auto' : 'none',
          transition: 'opacity .8s ease',
          overflowY: 'auto',
        }}
      >
        <div
          className="reel"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            minWidth: 0,
            minHeight: 0,
            overflowY: 'auto',
            scrollbarWidth: 'none',
            // room for diamond glow so the scroll container does not clip it
            paddingLeft: 8,
            marginLeft: -8,
          }}
        >
          <div
            style={{
              fontFamily: CINZEL, fontSize: 10, letterSpacing: '.32em', color: '#8fa6b4', textTransform: 'uppercase',
            }}
          >
            {d.job.type}
          </div>
          <div
            style={{
              fontFamily: CINZEL,
              fontSize: 28,
              fontWeight: 600,
              letterSpacing: '.06em',
              lineHeight: 1.15,
              color: '#eef3f6',
              textShadow: '0 0 22px rgba(200,225,240,.25)',
              textWrap: 'balance',
            }}
          >
            {d.job.title}
          </div>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'baseline',
              gap: '4px 10px',
              fontFamily: CORMORANT,
              fontSize: 19,
              color: '#c9d6de',
            }}
          >
            <span style={{ fontStyle: 'italic', whiteSpace: 'nowrap' }}>{d.job.company}</span>
            <span style={{ color: '#5b6b75' }}>·</span>
            <span style={{ color: '#8fa6b4', whiteSpace: 'nowrap' }}>{d.job.years}</span>
          </div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8, width: 180, margin: '4px 0',
          }}
          >
            <Diamond color={accent} glow />
            <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, #8fa6b4, transparent)' }} />
          </div>
          <p style={{
            margin: 0, fontFamily: CORMORANT, fontSize: 17, lineHeight: 1.55, color: '#c9d6de', textWrap: 'pretty',
          }}
          >
            {d.job.summary}
          </p>
        </div>
        {d.job.work.length > 0 && (
          <div style={{
            display: 'flex', flexDirection: 'column', gap: 10, minWidth: 0, minHeight: 0,
          }}
          >
            <div style={{
              fontFamily: CINZEL, fontSize: 10, letterSpacing: '.32em', color: '#8fa6b4', flex: '0 0 auto',
            }}
            >
              NOTABLE WORK
            </div>
            <div
              className="reel"
              style={{
                flex: 1,
                minHeight: 0,
                overflowY: 'auto',
                scrollbarWidth: 'none',
                paddingBottom: 28,
                // room for diamond glow so the scroll container does not clip it
                paddingLeft: 8,
                marginLeft: -8,
                WebkitMaskImage: 'linear-gradient(180deg, #000 calc(100% - 28px), transparent)',
                maskImage: 'linear-gradient(180deg, #000 calc(100% - 28px), transparent)',
              }}
            >
              {d.job.work.map((w) => (
                <div
                  key={w}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 14,
                    padding: '10px 0',
                    borderBottom: '1px solid rgba(143,166,180,.14)',
                  }}
                >
                  <div style={{ paddingTop: 8 }}>
                    <Diamond color={accent} glow />
                  </div>
                  <div style={{
                    fontFamily: CORMORANT, fontSize: 16, lineHeight: 1.45, color: '#c9d6de', textWrap: 'pretty',
                  }}
                  >
                    {w}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailsOverlay;
