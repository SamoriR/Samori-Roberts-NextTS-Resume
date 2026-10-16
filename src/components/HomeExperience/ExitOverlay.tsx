import React from 'react';

import { CINZEL, CORMORANT, EMAIL } from './constants';

const ExitOverlay = ({ isMobile }: { isMobile: boolean }) => (
  <div
    style={{
      position: 'absolute',
      inset: 0,
      zIndex: 9,
      background: '#000',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 16,
      padding: '0 24px',
      animation: 'fadeIn 1.1s ease both',
    }}
  >
    <div
      style={{
        fontFamily: CINZEL,
        fontSize: isMobile ? 17 : 22,
        letterSpacing: '.2em',
        color: '#eef3f6',
        textAlign: 'center',
        textWrap: 'balance',
        animation: 'fadeIn 1s ease .9s both',
      }}
    >
      THANKS FOR STOPPING BY
    </div>
    <div
      style={{
        fontFamily: CORMORANT,
        fontStyle: 'italic',
        fontSize: 17,
        color: '#8fa6b4',
        animation: 'fadeIn 1s ease 1.3s both',
      }}
    >
      {EMAIL}
    </div>
  </div>
);

export default ExitOverlay;
