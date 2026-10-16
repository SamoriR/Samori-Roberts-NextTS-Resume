'use client';

import { useEffect, useState } from 'react';

export interface Viewport {
  w: number;
  h: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  titleScale: number;
  titleTop: number;
  menuTop: number;
  navLeft: number;
  navTop: number;
  navScale: number;
}

const compute = (w: number, h: number): Viewport => {
  const isMobile = w < 600;
  const isTablet = w >= 600 && w < 760;
  const isDesktop = w >= 760;
  // Fit scale: anchors the title to the viewport, clamped at 1 so it never grows past natural.
  const titleScale = Math.min(1, Math.max(0.2, (w - 48) / 660));
  const titleTop = isMobile ? Math.round(h * 0.30) : Math.round(h * 0.236);
  // 116 is the unscaled height of the title block (kicker + name + divider + gaps).
  const menuTop = titleTop + 116 * titleScale + 56;
  const navLeft = isMobile ? 18 : 28;
  const navTop = 12;
  const navScale = isMobile ? 0.30 : 0.36;
  return {
    w, h, isMobile, isTablet, isDesktop, titleScale, titleTop, menuTop, navLeft, navTop, navScale,
  };
};

const useViewport = (): Viewport => {
  const [v, setV] = useState<Viewport>(() => compute(1280, 800));
  useEffect(() => {
    const onResize = () => setV(compute(window.innerWidth, window.innerHeight));
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return v;
};

export default useViewport;
