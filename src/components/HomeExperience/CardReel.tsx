import React from 'react';

import { Job, JobType } from '@/data/jobs';
import {
  CINZEL, CORMORANT, EASE_OUT, FILTERS, mix,
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
  const edgeWidth = isMobile ? '32px' : '72px';
  const maskLeft = edges.left ? edgeWidth : '0px';
  const maskRight = edges.right ? edgeWidth : '0px';
  return (
    <>
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 68,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 6,
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
                padding: '6px 16px 10px',
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
                  fontSize: 11,
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
                  left: 16,
                  right: 16,
                  bottom: 2,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 5,
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
          top: 104,
          bottom: 40,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'safe center',
          gap: isMobile ? 18 : 26,
          pointerEvents: 'auto',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          scrollbarWidth: 'none',
          padding: isMobile ? '0 24px' : '0 56px',
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
                padding: '12px 0 22px',
                position: 'relative',
                outline: 'none',
                animation: `fadeUp .9s ${EASE_OUT} ${i * 0.07}s both`,
                // Scale the whole card (chrome + inner type/logo/hint) together on mobile.
                zoom: isMobile ? 1.4 : undefined,
              }}
            >
              <div
                style={{
                  width: 150,
                  aspectRatio: '5 / 7',
                  boxSizing: 'border-box',
                  padding: 5,
                  border: `1px solid ${hov ? 'rgba(207,227,238,.9)' : 'rgba(143,166,180,.5)'}`,
                  borderRadius: 3,
                  background: 'linear-gradient(180deg, rgba(22,31,40,.88), rgba(7,10,14,.92))',
                  boxShadow: hov
                    ? '0 0 28px rgba(200,225,240,.18), 0 16px 34px rgba(0,0,0,.7)'
                    : '0 12px 30px rgba(0,0,0,.6)',
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
                    padding: '16px 10px 14px',
                  }}
                >
                  <div
                    style={{
                      fontFamily: CINZEL,
                      fontSize: 7.5,
                      letterSpacing: '.26em',
                      color: '#6f8390',
                      textTransform: 'uppercase',
                    }}
                  >
                    {job.type === 'Full-time Job' ? 'FULL-TIME JOB' : 'SIDE PROJECT'}
                  </div>
                  <div style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
                  }}
                  >
                    <LogoCircle src={job.logo} size={44} fit={job.logoFit} />
                    <div style={{
                      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5,
                    }}
                    >
                      <div
                        style={{
                          fontFamily: CINZEL,
                          fontSize: 11.5,
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
                          fontSize: 12,
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
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, width: '100%',
                  }}
                  >
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: 6, width: 56,
                    }}
                    >
                      <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, transparent, #8fa6b4)' }} />
                      <Diamond size={4} filled={false} />
                      <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, #8fa6b4, transparent)' }} />
                    </div>
                    <div style={{
                      fontFamily: CORMORANT, fontSize: 12, color: '#8fa6b4', letterSpacing: '.04em',
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
                  bottom: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 7,
                  opacity: hov ? 1 : 0,
                  transform: `translateY(${hov ? '0' : '-6px'})`,
                  transition: 'opacity .35s ease, transform .35s ease',
                  pointerEvents: 'none',
                }}
              >
                <Diamond size={4} glow />
                <span style={{
                  fontFamily: CINZEL, fontSize: 8, letterSpacing: '.3em', color: '#cfe3ee',
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
