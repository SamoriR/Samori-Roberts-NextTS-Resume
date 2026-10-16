import React from 'react';

import { Job } from '@/data/jobs';
import {
  CINZEL, CORMORANT, EASE_EMPH, EASE_OUT, heroPx, mix, rem,
} from './constants';
import { Diamond, LogoCircle, NavChevron } from './ui';

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
  prevJob: Job | null;
  nextJob: Job | null;
  onPrev: () => void;
  onNext: () => void;
  swapping: boolean;
  w: number;
  isMobile: boolean;
}

interface NavControlProps {
  job: Job | null;
  flip?: boolean;
  onClick: () => void;
  ariaLabel: string;
}

const NavControl = ({
  job, flip = false, onClick, ariaLabel,
}: NavControlProps) => {
  const disabled = !job;
  return (
    <div
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-label={ariaLabel}
      onClick={(ev) => {
        ev.stopPropagation();
        if (!disabled) onClick();
      }}
      onKeyDown={(ev) => {
        if (disabled) return;
        if (ev.key === 'Enter' || ev.key === ' ') {
          ev.preventDefault();
          ev.stopPropagation();
          onClick();
        }
      }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: rem(10),
        padding: rem(8),
        cursor: disabled ? 'default' : 'pointer',
        opacity: disabled ? 0.18 : 1,
        pointerEvents: disabled ? 'none' : 'auto',
        outline: 'none',
        transition: 'opacity .3s, filter .3s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.filter = `drop-shadow(0 0 ${rem(10)} rgba(207,227,238,.55))`;
        const label = e.currentTarget.lastElementChild as HTMLElement | null;
        if (label) label.style.color = '#ffffff';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.filter = '';
        const label = e.currentTarget.lastElementChild as HTMLElement | null;
        if (label) label.style.color = '#8fa6b4';
      }}
      onFocus={(e) => {
        e.currentTarget.style.filter = `drop-shadow(0 0 ${rem(10)} rgba(207,227,238,.55))`;
        const label = e.currentTarget.lastElementChild as HTMLElement | null;
        if (label) label.style.color = '#ffffff';
      }}
      onBlur={(e) => {
        e.currentTarget.style.filter = '';
        const label = e.currentTarget.lastElementChild as HTMLElement | null;
        if (label) label.style.color = '#8fa6b4';
      }}
    >
      <NavChevron flip={flip} />
      <div
        style={{
          fontFamily: CINZEL,
          fontSize: rem(8),
          letterSpacing: '.22em',
          textTransform: 'uppercase',
          color: '#8fa6b4',
          transition: 'color .3s',
          minHeight: rem(10),
        }}
      >
        {job ? job.company : ''}
      </div>
    </div>
  );
};

const DetailsOverlay = ({
  det: d, onClose, prevJob, nextJob, onPrev, onNext, swapping, w, isMobile,
}: DetailsOverlayProps) => {
  const isTabletWidth = w < 760;
  const bodyPadding = (() => {
    if (isMobile) return `0 ${rem(24)}`;
    if (isTabletWidth) return `0 ${rem(80)}`;
    return `0 ${rem(92)}`;
  })();
  const bodyTop = isMobile ? rem(72) : rem(84);
  const bodyBottom = isMobile ? rem(100) : rem(34);
  const titleSize = isMobile ? rem(24) : rem(28);
  // Opening logo size matches the card logo: 62 (mobile zoom) or 44 × heroScale.
  // Full-stage (expanded phase) and nav (breadcrumb) logo stay at the S scale.
  const openingLogo = isMobile ? rem(62) : heroPx(44);
  const fullLogo = rem(64);
  const navLogo = rem(28);
  // The grid is `minmax(280px, 1fr)` with 56px gap; two columns need ~616px of inner width.
  // Below ~800px the grid auto-collapses to one stacked column, so the two per-column
  // scrollers would feel like a bug (summary and Notable Work scroll independently).
  // Make the outer grid the sole scroller whenever we're in that single-column state.
  const singleColumn = w < 800;

  const touch = React.useRef<{ x: number; y: number } | null>(null);
  const onTouchStart = (ev: React.TouchEvent) => {
    const t = ev.touches[0];
    touch.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchEnd = (ev: React.TouchEvent) => {
    if (!touch.current || d.phase !== 'nav' || swapping) return;
    const t = ev.changedTouches[0];
    const dx = t.clientX - touch.current.x;
    const dy = t.clientY - touch.current.y;
    touch.current = null;
    if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy)) return;
    if (dx < 0) onNext();
    else onPrev();
  };
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
  let logoSize: string = openingLogo;
  if (full) logoSize = fullLogo;
  if (inNav) logoSize = navLogo;

  return (
    <div
      style={{
        position: 'absolute',
        zIndex: 4,
        left: r.l,
        top: r.t,
        width: r.w,
        height: r.h,
        borderRadius: full ? 0 : rem(3),
        boxSizing: 'border-box',
        border: '1px solid rgba(143,166,180,.5)',
        boxShadow: full ? '0 0 0 rgba(0,0,0,0)' : `0 ${rem(12)} ${rem(40)} rgba(0,0,0,.7)`,
        transition: `left .55s ${EASE_EMPH}, top .55s ${EASE_EMPH}, width .55s ${EASE_EMPH}, height .55s ${EASE_EMPH}, border-radius .55s ease, box-shadow .55s ease, opacity .5s ease`,
        opacity: d.phase === 'closing' ? 0 : 1,
        overflow: 'hidden',
        pointerEvents: 'auto',
      }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
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
        position: 'absolute', inset: rem(5), border: '1px solid rgba(143,166,180,.22)', pointerEvents: 'none',
      }}
      />
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: rem(18),
          textAlign: 'center',
          fontFamily: CINZEL,
          fontSize: rem(9.5),
          fontWeight: 600,
          letterSpacing: '.1em',
          color: '#eef3f6',
          textTransform: 'uppercase',
          padding: `0 ${rem(10)}`,
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
          bottom: rem(16),
          textAlign: 'center',
          fontFamily: CINZEL,
          fontSize: rem(7.5),
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
          opacity: navP && swapping ? 0 : 1,
          transition: `left .65s ${EASE_EMPH}, top .65s ${EASE_EMPH}, transform .65s ${EASE_EMPH}, opacity .4s ease`,
        }}
      >
        <Diamond
          filled={false}
          color="#8fa6b4"
          style={{
            position: 'absolute',
            right: `calc(100% + ${rem(12)})`,
            top: '50%',
            marginTop: rem(-3),
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
          right: rem(26),
          top: rem(24),
          display: 'flex',
          alignItems: 'center',
          gap: rem(8),
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
          fontFamily: CINZEL, fontSize: rem(11), letterSpacing: '.24em', color: '#eef3f6',
        }}
        >
          RETURN
        </span>
        {!isMobile && (
          <span style={{ fontFamily: CORMORANT, fontSize: rem(12), color: '#6f8390' }}>esc</span>
        )}
      </button>
      {singleColumn ? (
        <div
          key={d.job.company}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: bodyTop,
            bottom: bodyBottom,
            padding: bodyPadding,
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            gap: rem(12),
            opacity: navP && !swapping ? 1 : 0,
            pointerEvents: navP && !swapping ? 'auto' : 'none',
            transition: navP ? 'opacity .4s ease' : 'opacity .8s ease',
          }}
        >
          {/* Pinned heading: type, title, company · years, divider. */}
          <div
            className="rm-fade"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: rem(10),
              flex: '0 0 auto',
              paddingLeft: rem(8),
              marginLeft: rem(-8),
              animation: `fadeUp .7s ${EASE_OUT} both`,
            }}
          >
            <div
              style={{
                fontFamily: CINZEL, fontSize: rem(10), letterSpacing: '.32em', color: '#8fa6b4', textTransform: 'uppercase',
              }}
            >
              {d.job.type}
            </div>
            <div
              style={{
                fontFamily: CINZEL,
                fontSize: titleSize,
                fontWeight: 600,
                letterSpacing: '.06em',
                lineHeight: 1.15,
                color: '#eef3f6',
                textShadow: `0 0 ${rem(22)} rgba(200,225,240,.25)`,
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
                gap: `${rem(4)} ${rem(10)}`,
                fontFamily: CORMORANT,
                fontSize: rem(19),
                color: '#c9d6de',
              }}
            >
              <span style={{ fontStyle: 'italic', whiteSpace: 'nowrap' }}>{d.job.company}</span>
              <span style={{ color: '#5b6b75' }}>·</span>
              <span style={{ color: '#8fa6b4', whiteSpace: 'nowrap' }}>{d.job.years}</span>
            </div>
            <div style={{
              display: 'flex', alignItems: 'center', gap: rem(8), width: rem(180), margin: `${rem(4)} 0`,
            }}
            >
              <Diamond color={accent} glow />
              <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, #8fa6b4, transparent)' }} />
            </div>
          </div>

          {/* Scrollable body: summary + notable work bullets in one flow.
              A top + bottom fade mask gives the content a soft shadow as it
              passes under the pinned header and off the bottom edge. */}
          <div
            className="reel rm-fade"
            style={{
              flex: 1,
              minHeight: 0,
              overflowY: 'auto',
              scrollbarWidth: 'none',
              display: 'flex',
              flexDirection: 'column',
              gap: rem(14),
              paddingTop: rem(16),
              paddingBottom: rem(20),
              paddingLeft: rem(8),
              marginLeft: rem(-8),
              WebkitMaskImage: `linear-gradient(180deg, transparent 0, #000 ${rem(16)}, #000 calc(100% - ${rem(20)}), transparent)`,
              maskImage: `linear-gradient(180deg, transparent 0, #000 ${rem(16)}, #000 calc(100% - ${rem(20)}), transparent)`,
              animation: `fadeUp .7s ${EASE_OUT} .12s both`,
            }}
          >
            <p style={{
              margin: 0, fontFamily: CORMORANT, fontSize: rem(17), lineHeight: 1.55, color: '#c9d6de', textWrap: 'pretty',
            }}
            >
              {d.job.summary}
            </p>
            {d.job.work.length > 0 && (
              <>
                <div style={{
                  fontFamily: CINZEL, fontSize: rem(10), letterSpacing: '.32em', color: '#8fa6b4', marginTop: rem(4),
                }}
                >
                  NOTABLE WORK
                </div>
                {d.job.work.map((bullet) => (
                  <div
                    key={bullet}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: rem(14),
                      padding: `${rem(10)} 0`,
                      borderBottom: '1px solid rgba(143,166,180,.14)',
                    }}
                  >
                    <div style={{ paddingTop: rem(8) }}>
                      <Diamond color={accent} glow />
                    </div>
                    <div style={{
                      fontFamily: CORMORANT, fontSize: rem(16), lineHeight: 1.45, color: '#c9d6de', textWrap: 'pretty',
                    }}
                    >
                      {bullet}
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      ) : (
        <div
          key={d.job.company}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: bodyTop,
            bottom: bodyBottom,
            padding: bodyPadding,
            boxSizing: 'border-box',
            display: 'grid',
            gridTemplateColumns: `repeat(auto-fit, minmax(${rem(280)}, 1fr))`,
            gap: `${rem(24)} ${rem(56)}`,
            opacity: navP && !swapping ? 1 : 0,
            pointerEvents: navP && !swapping ? 'auto' : 'none',
            transition: navP ? 'opacity .4s ease' : 'opacity .8s ease',
            overflowY: 'auto',
          }}
        >
          <div
            className="reel rm-fade"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: rem(12),
              minWidth: 0,
              minHeight: 0,
              overflowY: 'auto',
              scrollbarWidth: 'none',
              // room for diamond glow so the scroll container does not clip it
              paddingLeft: rem(8),
              marginLeft: rem(-8),
              animation: `fadeUp .7s ${EASE_OUT} both`,
            }}
          >
            <div
              style={{
                fontFamily: CINZEL, fontSize: rem(10), letterSpacing: '.32em', color: '#8fa6b4', textTransform: 'uppercase',
              }}
            >
              {d.job.type}
            </div>
            <div
              style={{
                fontFamily: CINZEL,
                fontSize: titleSize,
                fontWeight: 600,
                letterSpacing: '.06em',
                lineHeight: 1.15,
                color: '#eef3f6',
                textShadow: `0 0 ${rem(22)} rgba(200,225,240,.25)`,
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
                gap: `${rem(4)} ${rem(10)}`,
                fontFamily: CORMORANT,
                fontSize: rem(19),
                color: '#c9d6de',
              }}
            >
              <span style={{ fontStyle: 'italic', whiteSpace: 'nowrap' }}>{d.job.company}</span>
              <span style={{ color: '#5b6b75' }}>·</span>
              <span style={{ color: '#8fa6b4', whiteSpace: 'nowrap' }}>{d.job.years}</span>
            </div>
            <div style={{
              display: 'flex', alignItems: 'center', gap: rem(8), width: rem(180), margin: `${rem(4)} 0`,
            }}
            >
              <Diamond color={accent} glow />
              <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, #8fa6b4, transparent)' }} />
            </div>
            <p style={{
              margin: 0, fontFamily: CORMORANT, fontSize: rem(17), lineHeight: 1.55, color: '#c9d6de', textWrap: 'pretty',
            }}
            >
              {d.job.summary}
            </p>
          </div>
          {d.job.work.length > 0 && (
            <div
              className="rm-fade"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: rem(10),
                minWidth: 0,
                minHeight: 0,
                animation: `fadeUp .7s ${EASE_OUT} .12s both`,
              }}
            >
              <div style={{
                fontFamily: CINZEL, fontSize: rem(10), letterSpacing: '.32em', color: '#8fa6b4', flex: '0 0 auto',
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
                  paddingBottom: rem(28),
                  // room for diamond glow so the scroll container does not clip it
                  paddingLeft: rem(8),
                  marginLeft: rem(-8),
                  WebkitMaskImage: `linear-gradient(180deg, #000 calc(100% - ${rem(28)}), transparent)`,
                  maskImage: `linear-gradient(180deg, #000 calc(100% - ${rem(28)}), transparent)`,
                }}
              >
                {d.job.work.map((bullet) => (
                  <div
                    key={bullet}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: rem(14),
                      padding: `${rem(10)} 0`,
                      borderBottom: '1px solid rgba(143,166,180,.14)',
                    }}
                  >
                    <div style={{ paddingTop: rem(8) }}>
                      <Diamond color={accent} glow />
                    </div>
                    <div style={{
                      fontFamily: CORMORANT, fontSize: rem(16), lineHeight: 1.45, color: '#c9d6de', textWrap: 'pretty',
                    }}
                    >
                      {bullet}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <div
        style={{
          position: 'absolute',
          left: isMobile ? rem(10) : rem(16),
          top: isMobile ? 'auto' : '50%',
          bottom: isMobile ? rem(12) : 'auto',
          transform: isMobile ? 'none' : 'translateY(-50%)',
          zIndex: 6,
          opacity: navP && !swapping ? 1 : 0,
          pointerEvents: navP && !swapping ? 'auto' : 'none',
          transition: 'opacity .6s ease',
        }}
      >
        <NavControl
          job={prevJob}
          onClick={onPrev}
          ariaLabel="Previous"
        />
      </div>
      <div
        style={{
          position: 'absolute',
          right: isMobile ? rem(10) : rem(16),
          top: isMobile ? 'auto' : '50%',
          bottom: isMobile ? rem(12) : 'auto',
          transform: isMobile ? 'none' : 'translateY(-50%)',
          zIndex: 6,
          opacity: navP && !swapping ? 1 : 0,
          pointerEvents: navP && !swapping ? 'auto' : 'none',
          transition: 'opacity .6s ease',
        }}
      >
        <NavControl
          job={nextJob}
          flip
          onClick={onNext}
          ariaLabel="Next"
        />
      </div>
    </div>
  );
};

export default DetailsOverlay;
