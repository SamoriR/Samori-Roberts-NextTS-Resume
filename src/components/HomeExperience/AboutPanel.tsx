import React from 'react';

import aboutImage from '@/images/avatar-2.jpg';
import {
  BIO, CINZEL, CORMORANT, EASE_OUT, LINKS, NOW,
} from './constants';
import { Diamond } from './ui';

const linkButtonOn = (el: HTMLElement) => {
  Object.assign(el.style, {
    color: '#ffffff',
    borderColor: 'rgba(207,227,238,.9)',
    boxShadow: '0 0 14px rgba(200,225,240,.18)',
  });
};

const linkButtonOff = (el: HTMLElement) => {
  Object.assign(el.style, {
    color: '#cfe3ee',
    borderColor: 'rgba(143,166,180,.4)',
    boxShadow: 'none',
  });
};

const AboutPanel = () => (
  <div
    style={{
      position: 'absolute',
      left: 0,
      right: 0,
      top: 100,
      bottom: 44,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 52,
      pointerEvents: 'auto',
      padding: '0 60px',
    }}
  >
    <div
      className="rm-fade"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 18,
        animation: `fadeUp 1s ${EASE_OUT} .1s both`,
        flex: '0 0 auto',
      }}
    >
      <div
        style={{
          width: 170,
          height: 226,
          boxSizing: 'border-box',
          padding: 6,
          border: '1px solid rgba(143,166,180,.5)',
          borderRadius: 3,
          background: 'linear-gradient(180deg, rgba(22,31,40,.88), rgba(7,10,14,.92))',
          boxShadow: '0 12px 30px rgba(0,0,0,.6), 0 0 30px rgba(200,225,240,.06)',
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
            bottom: -5,
            marginLeft: -5,
            border: '1px solid #cfe3ee',
          }}
        />
      </div>
      <div
        className="rm-fade"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 6,
          width: 170,
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
              gap: 7,
              height: 30,
              boxSizing: 'border-box',
              border: '1px solid rgba(143,166,180,.4)',
              borderRadius: 2,
              background: 'linear-gradient(180deg, rgba(22,31,40,.7), rgba(7,10,14,.85))',
              fontFamily: CINZEL,
              fontSize: 9,
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
            <Diamond size={3} style={{ boxShadow: '0 0 6px #cfe3ee' }} />
            {l.label}
          </a>
        ))}
      </div>
    </div>
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
        maxWidth: 440,
        minWidth: 0,
        maxHeight: '100%',
        minHeight: 0,
      }}
    >
      <div
        className="rm-fade"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          flex: '0 0 auto',
          animation: `fadeUp 1s ${EASE_OUT} .2s both`,
        }}
      >
        <div
          style={{
            fontFamily: CINZEL,
            fontSize: 20,
            fontWeight: 600,
            letterSpacing: '.2em',
            color: '#eef3f6',
            textShadow: '0 0 18px rgba(200,225,240,.25)',
          }}
        >
          ABOUT
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8, width: 150,
        }}
        >
          <Diamond filled={false} />
          <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, #8fa6b4, transparent)' }} />
        </div>
      </div>
      <div
        className="reel"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
          minHeight: 0,
          overflowY: 'auto',
          scrollbarWidth: 'none',
          paddingBottom: 20,
          paddingLeft: 8,
          marginLeft: -8,
          WebkitMaskImage: 'linear-gradient(180deg, #000 calc(100% - 20px), transparent)',
          maskImage: 'linear-gradient(180deg, #000 calc(100% - 20px), transparent)',
        }}
      >
        <p
          className="rm-fade"
          style={{
            margin: 0,
            fontFamily: CORMORANT,
            fontSize: 17,
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
            display: 'flex', flexDirection: 'column', gap: 6, animation: `fadeUp 1s ${EASE_OUT} .4s both`,
          }}
        >
          <div style={{
            fontFamily: CINZEL, fontSize: 10, letterSpacing: '.3em', color: '#8fa6b4',
          }}
          >
            NOW
          </div>
          <p style={{
            margin: 0, fontFamily: CORMORANT, fontSize: 16, lineHeight: 1.5, color: '#c9d6de', textWrap: 'pretty',
          }}
          >
            {NOW}
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default AboutPanel;
