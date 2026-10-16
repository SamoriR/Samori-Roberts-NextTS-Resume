import React from 'react';

import aboutImage from '@/images/avatar-2.jpg';
import {
  BIO, CINZEL, CORMORANT, EASE_OUT, LINKS, NOW, rem,
} from './constants';
import { Diamond } from './ui';

const linkButtonOn = (el: HTMLElement) => {
  Object.assign(el.style, {
    color: '#ffffff',
    borderColor: 'rgba(207,227,238,.9)',
    boxShadow: `0 0 ${rem(14)} rgba(200,225,240,.18)`,
  });
};

const linkButtonOff = (el: HTMLElement) => {
  Object.assign(el.style, {
    color: '#cfe3ee',
    borderColor: 'rgba(143,166,180,.4)',
    boxShadow: 'none',
  });
};

const AboutPanel = ({ w }: { w: number }) => {
  const column = w < 680;
  const narrow = w < 760;
  let gap = rem(52);
  if (column) gap = rem(28);
  else if (narrow) gap = rem(36);
  let padding = `0 ${rem(60)}`;
  if (column) padding = `${rem(12)} ${rem(24)} ${rem(24)}`;
  else if (narrow) padding = `0 ${rem(32)}`;
  // Shadow effect: on mobile the whole panel is the scroller, so fade the top
  // and bottom edges to give content a soft shadow as it enters/leaves view.
  const edgeMask = column
    ? `linear-gradient(180deg, transparent 0, #000 ${rem(16)}, #000 calc(100% - ${rem(20)}), transparent)`
    : undefined;
  return (
    <div
      className={column ? 'reel' : undefined}
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: rem(100),
        bottom: rem(44),
        display: 'flex',
        flexDirection: column ? 'column' : 'row',
        alignItems: 'center',
        justifyContent: column ? 'flex-start' : 'center',
        gap,
        pointerEvents: 'auto',
        padding,
        overflowY: 'auto',
        scrollbarWidth: column ? 'none' : undefined,
        WebkitMaskImage: edgeMask,
        maskImage: edgeMask,
      }}
    >
      <div
        className="rm-fade"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: rem(18),
          animation: `fadeUp 1s ${EASE_OUT} .1s both`,
          flex: '0 0 auto',
        }}
      >
        <div
          style={{
            width: rem(170),
            height: rem(226),
            boxSizing: 'border-box',
            padding: rem(6),
            border: '1px solid rgba(143,166,180,.5)',
            borderRadius: rem(3),
            background: 'linear-gradient(180deg, rgba(22,31,40,.88), rgba(7,10,14,.92))',
            boxShadow: `0 ${rem(12)} ${rem(30)} rgba(0,0,0,.6), 0 0 ${rem(30)} rgba(200,225,240,.06)`,
            position: 'relative',
          }}
        >
          <div
            style={{
              height: '100%',
              boxSizing: 'border-box',
              border: '1px solid rgba(143,166,180,.22)',
              overflow: 'hidden',
            }}
          >
            <img
              src={aboutImage.src}
              alt="Samori Roberts"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <Diamond
            size={9}
            filled
            color="#05070a"
            style={{
              position: 'absolute',
              left: '50%',
              bottom: rem(-5),
              marginLeft: rem(-5),
              border: '1px solid #cfe3ee',
            }}
          />
        </div>
        <div
          className="rm-fade"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: rem(6),
            width: rem(170),
            animation: `fadeUp 1s ${EASE_OUT} .5s both`,
          }}
        >
          {LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith('mailto') ? undefined : '_blank'}
              rel="noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: rem(7),
                height: rem(30),
                boxSizing: 'border-box',
                border: '1px solid rgba(143,166,180,.4)',
                borderRadius: rem(2),
                background: 'linear-gradient(180deg, rgba(22,31,40,.7), rgba(7,10,14,.85))',
                fontFamily: CINZEL,
                fontSize: rem(9),
                letterSpacing: '.2em',
                textTransform: 'uppercase',
                color: '#cfe3ee',
                textDecoration: 'none',
                outline: 'none',
                transition: 'border-color .3s, color .3s, box-shadow .3s',
              }}
              onMouseEnter={(e) => linkButtonOn(e.currentTarget)}
              onMouseLeave={(e) => linkButtonOff(e.currentTarget)}
              onFocus={(e) => linkButtonOn(e.currentTarget)}
              onBlur={(e) => linkButtonOff(e.currentTarget)}
            >
              <Diamond size={3} style={{ boxShadow: `0 0 ${rem(6)} #cfe3ee` }} />
              {l.label}
            </a>
          ))}
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: rem(14),
          width: '100%',
          maxWidth: rem(440),
          minWidth: 0,
          // On mobile the outer container is the single scroll parent, so the text
          // column grows naturally and nothing is pinned.
          maxHeight: column ? 'none' : '100%',
          minHeight: 0,
        }}
      >
        <div
          className="rm-fade"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: rem(8),
            flex: '0 0 auto',
            animation: `fadeUp 1s ${EASE_OUT} .2s both`,
          }}
        >
          <div
            style={{
              fontFamily: CINZEL,
              fontSize: rem(20),
              fontWeight: 600,
              letterSpacing: '.2em',
              color: '#eef3f6',
              textShadow: `0 0 ${rem(18)} rgba(200,225,240,.25)`,
            }}
          >
            ABOUT
          </div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: rem(8), width: rem(150),
          }}
          >
            <Diamond filled={false} />
            <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, #8fa6b4, transparent)' }} />
          </div>
        </div>
        <div
          className={column ? '' : 'reel'}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: rem(14),
            minHeight: 0,
            overflowY: column ? 'visible' : 'auto',
            scrollbarWidth: 'none',
            paddingBottom: column ? 0 : rem(20),
            paddingLeft: rem(8),
            marginLeft: rem(-8),
            WebkitMaskImage: column ? undefined : `linear-gradient(180deg, #000 calc(100% - ${rem(20)}), transparent)`,
            maskImage: column ? undefined : `linear-gradient(180deg, #000 calc(100% - ${rem(20)}), transparent)`,
          }}
        >
          <p
            className="rm-fade"
            style={{
              margin: 0,
              fontFamily: CORMORANT,
              fontSize: rem(17),
              lineHeight: 1.5,
              color: '#c9d6de',
              textWrap: 'pretty',
              animation: `fadeUp 1s ${EASE_OUT} .3s both`,
            }}
          >
            {BIO}
          </p>
          <div
            className="rm-fade"
            style={{
              display: 'flex', flexDirection: 'column', gap: rem(6), animation: `fadeUp 1s ${EASE_OUT} .4s both`,
            }}
          >
            <div style={{
              fontFamily: CINZEL, fontSize: rem(10), letterSpacing: '.3em', color: '#8fa6b4',
            }}
            >
              NOW
            </div>
            <p style={{
              margin: 0, fontFamily: CORMORANT, fontSize: rem(16), lineHeight: 1.5, color: '#c9d6de', textWrap: 'pretty',
            }}
            >
              {NOW}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPanel;
