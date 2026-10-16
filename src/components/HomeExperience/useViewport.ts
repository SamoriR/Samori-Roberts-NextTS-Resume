'use client';

import { useEffect, useState } from 'react';

// Per RESPONSIVE_RULES.md: desktop is the base, tablet (<760) and mobile (<600)
// are overrides. Below 1200px, S=1 and spec values apply as-is. At >=1200px, S
// scales uniformly via the root font-size (every spec value authored in rem).
export interface Viewport {
  w: number;
  h: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  // Global scale factor; 1 below 1200px, up to 1.6 on large screens.
  S: number;
  // Hero boost applied on top of S for title block + cards only.
  // B = 1 + 0.25 * (S - 1) / 0.6. At S=1, B=1. At S=1.6, B=1.25.
  B: number;
  // heroScale = S * B. At S=1, 1. At S=1.6, 2.0.
  heroScale: number;
  // Title block continuous scale, capped at 1 so desktop/large desktop never clip it.
  titleScale: number;
  // Positions in device px (not scaled by S here; JS layout math multiplies.)
  titleTop: number;
  menuTop: number;
  // Nav collapse target: fixed per breakpoint (JS also multiplies by S downstream).
  navLeft: number;
  navTop: number;
  navScale: number;
}

const computeS = (w: number, h: number): number => {
  if (w < 1200) return 1;
  return Math.min(1.6, Math.max(1, Math.min(w / 1200, h / 750)));
};

const compute = (w: number, h: number): Viewport => {
  const isMobile = w < 600;
  const isTablet = w >= 600 && w < 760;
  const isDesktop = w >= 760;
  const S = computeS(w, h);
  const B = 1 + (0.25 * (S - 1)) / 0.6;
  const heroScale = S * B;
  // The title fit uses heroScale so k stays 1 on every large desktop.
  const titleScale = Math.min(1, Math.max(0.2, (w - 48) / (660 * heroScale)));
  const titleTop = isMobile ? Math.round(h * 0.30) : Math.round(h * 0.236);
  // Title block scales by heroScale; the gap to the menu is in S units.
  const menuTop = titleTop + 116 * titleScale * heroScale + 56 * S;
  const navLeft = isMobile ? 18 : 28;
  const navTop = 12;
  const navScale = isMobile ? 0.30 : 0.36;
  return {
    w,
    h,
    isMobile,
    isTablet,
    isDesktop,
    S,
    B,
    heroScale,
    titleScale,
    titleTop,
    menuTop,
    navLeft,
    navTop,
    navScale,
  };
};

const useViewport = (): Viewport => {
  const [v, setV] = useState<Viewport>(() => compute(1280, 800));
  useEffect(() => {
    const onResize = () => {
      const nextV = compute(window.innerWidth, window.innerHeight);
      // Set root font-size so every rem value in the tree scales by S.
      document.documentElement.style.fontSize = `${(16 * nextV.S).toFixed(2)}px`;
      // Expose S and hero as CSS variables so inline styles can use heroPx(n).
      document.documentElement.style.setProperty('--s', nextV.S.toFixed(4));
      document.documentElement.style.setProperty('--hero', nextV.heroScale.toFixed(4));
      setV(nextV);
    };
    onResize();
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      document.documentElement.style.fontSize = '';
      document.documentElement.style.removeProperty('--s');
      document.documentElement.style.removeProperty('--hero');
    };
  }, []);
  return v;
};

export default useViewport;
