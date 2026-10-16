import React from 'react';

import { Job, JobType } from '@/data/jobs';
import {
  CINZEL, CORMORANT, EASE_OUT, FILTERS, heroPx, mix, rem,
} from './constants';
import { Diamond, LogoCircle } from './ui';

interface CardReelProps {
  reelKey: number;
  jobs: Job[];
  filter: 'All' | JobType;
  onFilter: (value: 'All' | JobType) => void;
  hoverCompany: string | null;
  onHover: (job: Job | null) => void;
  onOpen: (job: Job, cardEl: HTMLElement | null) => void;
  edges: { left: boolean; right: boolean };
  onScroll: () => void;
  setReelEl: (el: HTMLDivElement | null) => void;
  underStyle: React.CSSProperties;
  isMobile: boolean;
}

const CardReel = ({
  reelKey, jobs, filter, onFilter, hoverCompany, onHover,
  onOpen, edges, onScroll, setReelEl, underStyle, isMobile,
}: CardReelProps) => {
  const edgeWidth = isMobile ? rem(32) : rem(72);
  const maskLeft = edges.left ? edgeWidth : '0';
  const maskRight = edges.right ? edgeWidth : '0';
  return (
    <>
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: rem(68),
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: rem(6),
          pointerEvents: 'auto',
          animation: 'fadeIn .8s ease .1s both',
          ...underStyle,
        }}
      >
        {FILTERS.map((fl) => {
          const on = filter === fl.value;
          return (
            <button
              type="button"
              key={fl.value}
              onClick={() => onFilter(fl.value)}
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: `${rem(6)} ${rem(16)} ${rem(10)}`,
                cursor: 'pointer',
                outline: 'none',
                background: 'none',
                border: 'none',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget.firstElementChild as HTMLElement).style.color = '#ffffff';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget.firstElementChild as HTMLElement).style.color = on ? '#ffffff' : '#7d8f9a';
              }}
            >
              <span
                style={{
                  fontFamily: CINZEL,
                  fontSize: rem(11),
                  letterSpacing: '.24em',
                  color: on ? '#ffffff' : '#7d8f9a',
                  transition: 'color .3s',
                  whiteSpace: 'nowrap',
                }}
              >
                {fl.label}
              </span>
              <span
                style={{
                  position: 'absolute',
                  left: rem(16),
                  right: rem(16),
                  bottom: rem(2),
                  display: 'flex',
                  alignItems: 'center',
                  gap: rem(5),
                  transform: `scaleX(${on ? 1 : 0})`,
                  transition: `transform .45s ${EASE_OUT}`,
                }}
              >
                <span style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, transparent, #cfe3ee)' }} />
                <Diamond size={4} glow />
                <span style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, #cfe3ee, transparent)' }} />
              </span>
            </button>
          );
        })}
      </div>

      <div
        key={reelKey}
        ref={setReelEl}
        onScroll={onScroll}
        className="reel"
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: rem(104),
          bottom: rem(40),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'safe center',
          gap: isMobile ? rem(18) : heroPx(26),
          pointerEvents: 'auto',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          scrollbarWidth: 'none',
          padding: isMobile ? `0 ${rem(24)}` : `0 ${rem(56)}`,
          boxSizing: 'border-box',
          WebkitMaskImage: `linear-gradient(90deg, transparent, #000 ${maskLeft}, #000 calc(100% - ${maskRight}), transparent)`,
          maskImage: `linear-gradient(90deg, transparent, #000 ${maskLeft}, #000 calc(100% - ${maskRight}), transparent)`,
          ...underStyle,
        }}
      >
        {jobs.map((job, i) => {
          const hov = hoverCompany === job.company;
          return (
            <div
              key={job.company}
              role="button"
              tabIndex={0}
              aria-label={`${job.title} at ${job.company}, ${job.years}`}
              onMouseEnter={() => onHover(job)}
              onMouseLeave={() => onHover(null)}
              onFocus={() => onHover(job)}
              onBlur={() => onHover(null)}
              onClick={(e) => {
                e.stopPropagation();
                onOpen(job, e.currentTarget.firstElementChild as HTMLElement);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onOpen(job, e.currentTarget.firstElementChild as HTMLElement);
                }
              }}
              className="rm-fade"
              style={{
                flex: '0 0 auto',
                scrollSnapAlign: 'center',
                padding: `${rem(12)} 0 ${rem(22)}`,
                position: 'relative',
                outline: 'none',
                animation: `fadeUp .9s ${EASE_OUT} ${i * 0.07}s both`,
                // Scale the whole card (chrome + inner type/logo/hint) together on mobile.
                zoom: isMobile ? 1.4 : undefined,
              }}
            >
              <div
                style={{
                  // Card width + padding + inner typography are hero-scaled per handoff.
                  width: heroPx(150),
                  aspectRatio: '5 / 7',
                  boxSizing: 'border-box',
                  padding: heroPx(5),
                  border: `1px solid ${hov ? 'rgba(207,227,238,.9)' : 'rgba(143,166,180,.5)'}`,
                  borderRadius: rem(3),
                  background: 'linear-gradient(180deg, rgba(22,31,40,.88), rgba(7,10,14,.92))',
                  boxShadow: hov
                    ? `0 0 ${rem(28)} rgba(200,225,240,.18), 0 ${rem(16)} ${rem(34)} rgba(0,0,0,.7)`
                    : `0 ${rem(12)} ${rem(30)} rgba(0,0,0,.6)`,
                  cursor: 'pointer',
                  transform: hov ? 'translateY(-8px)' : 'translateY(0)',
                  transition: 'transform .4s ease, border-color .4s ease, box-shadow .4s ease',
                }}
              >
                <div
                  style={{
                    height: '100%',
                    boxSizing: 'border-box',
                    border: '1px solid rgba(143,166,180,.22)',
                    display: 'grid',
                    gridTemplateRows: 'auto 1fr auto',
                    alignItems: 'center',
                    justifyItems: 'center',
                    textAlign: 'center',
                    padding: `${heroPx(16)} ${heroPx(10)} ${heroPx(14)}`,
                  }}
                >
                  <div
                    style={{
                      fontFamily: CINZEL,
                      fontSize: rem(7.5),
                      letterSpacing: '.26em',
                      color: '#6f8390',
                      textTransform: 'uppercase',
                    }}
                  >
                    {job.type === 'Full-time Job' ? 'FULL-TIME JOB' : 'SIDE PROJECT'}
                  </div>
                  <div style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: heroPx(12),
                  }}
                  >
                    <LogoCircle src={job.logo} size={heroPx(44)} fit={job.logoFit} />
                    <div style={{
                      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: heroPx(5),
                    }}
                    >
                      <div
                        style={{
                          fontFamily: CINZEL,
                          fontSize: heroPx(11.5),
                          fontWeight: 600,
                          letterSpacing: '.16em',
                          color: hov ? mix(job.brand, '#eef3f6', 70) : '#eef3f6',
                          transition: 'color .5s ease',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {job.company.toUpperCase()}
                      </div>
                      <div
                        style={{
                          fontFamily: CORMORANT,
                          fontSize: heroPx(12),
                          lineHeight: 1.35,
                          color: '#eef3f6',
                          letterSpacing: '.02em',
                        }}
                      >
                        {job.title}
                      </div>
                    </div>
                  </div>
                  <div style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: rem(8), width: '100%',
                  }}
                  >
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: rem(6), width: rem(56),
                    }}
                    >
                      <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, transparent, #8fa6b4)' }} />
                      <Diamond size={4} filled={false} />
                      <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, #8fa6b4, transparent)' }} />
                    </div>
                    <div style={{
                      fontFamily: CORMORANT, fontSize: heroPx(12), color: '#8fa6b4', letterSpacing: '.04em',
                    }}
                    >
                      {job.years}
                    </div>
                  </div>
                </div>
              </div>
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  bottom: rem(2),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: rem(7),
                  opacity: hov ? 1 : 0,
                  transform: `translateY(${hov ? '0' : '-6px'})`,
                  transition: 'opacity .35s ease, transform .35s ease',
                  pointerEvents: 'none',
                }}
              >
                <Diamond size={4} glow />
                <span style={{
                  fontFamily: CINZEL, fontSize: heroPx(8), letterSpacing: '.3em', color: '#cfe3ee',
                }}
                >
                  VIEW
                </span>
                <Diamond size={4} glow />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default CardReel;
