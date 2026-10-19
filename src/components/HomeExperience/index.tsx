'use client';

import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';

import jobs, { Job, JobType } from '@/data/jobs';
import {
  CINZEL, CORMORANT, EASE_EMPH, EASE_OUT, FULL_T, heroPx, MENU, mix, rem, SHORT_T,
} from './constants';
import { Diamond } from './ui';
import Ambient from './Ambient';
import AboutPanel from './AboutPanel';
import CardReel from './CardReel';
import DetailsOverlay, { DetState, Phase } from './DetailsOverlay';
import ExitOverlay from './ExitOverlay';
import useViewport from './useViewport';

const HomeExperience = () => {
  const vp = useViewport();
  const [entered, setEntered] = useState(false);
  const [cardsOn, setCardsOn] = useState(false);
  const [viewMode, setViewMode] = useState<'cards' | 'about'>('cards');
  const [sel, setSel] = useState(0);
  const [filter, setFilter] = useState<'All' | JobType>('All');
  const [introDone, setIntroDone] = useState(false);
  const [short, setShort] = useState(false);
  const [titleKey, setTitleKey] = useState(0);
  const [titleOff, setTitleOff] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [exitOpen, setExitOpen] = useState(false);
  const [reelKey, setReelKey] = useState(0);
  const [edges, setEdges] = useState({ left: false, right: true });
  const [paused, setPaused] = useState(false);
  const [hover, setHover] = useState<Job | null>(null);
  const [det, setDet] = useState<DetState | null>(null);
  const [swapping, setSwapping] = useState(false);

  const sceneRef = useRef<HTMLDivElement>(null);
  const reelRef = useRef<HTMLDivElement | null>(null);
  const nameRef = useRef<HTMLButtonElement>(null);
  const detTimers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const swapTimers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const T = short ? SHORT_T : FULL_T;

  const clearDetTimers = () => {
    detTimers.current.forEach(clearTimeout);
    detTimers.current = [];
  };

  const clearSwapTimers = () => {
    swapTimers.current.forEach(clearTimeout);
    swapTimers.current = [];
  };

  const measureReel = useCallback(() => {
    const r = reelRef.current;
    if (!r) return;
    const max = r.scrollWidth - r.clientWidth;
    setEdges({ left: r.scrollLeft > 8, right: max - r.scrollLeft > 8 });
  }, []);

  const setReelEl = useCallback((el: HTMLDivElement | null) => {
    reelRef.current = el;
    if (el) setTimeout(measureReel, 50);
  }, [measureReel]);

  // Re-measure the reel on viewport changes (useViewport already triggers a render).
  useEffect(() => { measureReel(); }, [vp.w, vp.h, measureReel]);

  useEffect(() => {
    const onVis = () => setPaused(document.hidden);
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem('introMode') === 'short') {
      setShort(true);
      setTitleKey((k) => k + 1);
    }
  }, []);

  // Exit sign-off plays its goodbye, then returns to the title on its own.
  useEffect(() => {
    if (!exitOpen) return undefined;
    const t = setTimeout(() => setExitOpen(false), 10000);
    return () => clearTimeout(t);
  }, [exitOpen]);

  // Intro timer: menu becomes interactive when it elapses.
  useEffect(() => {
    if (entered || titleOff || introDone) return undefined;
    const t = setTimeout(() => setIntroDone(true), (short ? SHORT_T : FULL_T).done);
    return () => clearTimeout(t);
  }, [entered, titleOff, titleKey, short, introDone]);

  const pickMenu = useCallback((i: number) => {
    const label = MENU[i];
    if (label === 'Exit') {
      setExitOpen(true);
      return;
    }
    setEntered(true);
    setViewMode(label === 'About' ? 'about' : 'cards');
    sessionStorage.setItem('introMode', 'short');
    // let the name finish its 1.1s move to the nav before anything else animates in
    setTimeout(() => setCardsOn(true), 1200);
  }, []);

  const closeDet = useCallback(() => {
    setDet((d) => {
      if (!d || d.phase !== 'nav') return d;
      clearDetTimers();
      clearSwapTimers();
      setSwapping(false);
      detTimers.current.push(setTimeout(() => {
        setDet(null);
        setReelKey((k) => k + 1);
      }, 520));
      return { ...d, phase: 'closing' };
    });
  }, []);

  const backToTitle = useCallback(() => {
    if (!cardsOn || leaving || det) return;
    setLeaving(true);
    setTimeout(() => {
      clearDetTimers();
      clearSwapTimers();
      setSwapping(false);
      setDet(null);
      setTitleOff(true);
      setEntered(false);
      setCardsOn(false);
      setLeaving(false);
      setSel(0);
      setShort(true);
      setIntroDone(false);
      setFilter('All');
      setViewMode('cards');
      setTimeout(() => {
        setTitleOff(false);
        setTitleKey((k) => k + 1);
      }, 50);
    }, 650);
  }, [cardsOn, leaving, det]);

  const openDet = useCallback((job: Job, cardEl: HTMLElement | null) => {
    const scene = sceneRef.current;
    if (det || !scene || !cardEl) return;
    const s = scene.getBoundingClientRect();
    const r = cardEl.getBoundingClientRect();
    const rect = {
      l: r.left - s.left,
      t: r.top - s.top,
      w: r.width,
      h: r.height,
      lx: 0,
      ly: 0,
    };
    const lg = cardEl.querySelector('[data-logo]');
    if (lg) {
      const g = lg.getBoundingClientRect();
      rect.lx = (g.left + g.width / 2) - (r.left + r.width / 2);
      rect.ly = (g.top + g.height / 2) - (r.top + r.height / 2);
    }
    // Per large-screens handoff:
    //   left = 28·S + 628·heroScale·(navScale/B) + 25·S
    //   top  = (navTop + 62·navScale − 14) · S
    // The nav-name block scales by heroScale internally, then transforms by
    // navScale/B, so its on-screen width is 628 × heroScale × (navScale/B).
    const nav = {
      l: vp.navLeft * vp.S + 628 * vp.heroScale * (vp.navScale / vp.B) + 25 * vp.S,
      t: (vp.navTop + 62 * vp.navScale - 14) * vp.S,
    };
    clearDetTimers();
    setDet({
      job, rect, W: scene.offsetWidth, H: scene.offsetHeight, nav, phase: 'start',
    });
    const phase = (p: Phase) => setDet((d) => (d ? { ...d, phase: p } : d));
    detTimers.current.push(setTimeout(() => phase('full'), 380));
    detTimers.current.push(setTimeout(() => phase('logo'), 930));
    detTimers.current.push(setTimeout(() => phase('nav'), 1380));
  }, [det, vp.navLeft, vp.navScale, vp.navTop, vp.S, vp.B, vp.heroScale]);

  // Keep the overlay sized to the live viewport (and nav slot repositioned on breakpoint flip).
  useEffect(() => {
    if (!det) return;
    const scene = sceneRef.current;
    setDet((d) => (d ? {
      ...d,
      W: scene ? scene.offsetWidth : d.W,
      H: scene ? scene.offsetHeight : d.H,
      nav: {
        l: vp.navLeft * vp.S + 628 * vp.heroScale * (vp.navScale / vp.B) + 25 * vp.S,
        t: (vp.navTop + 62 * vp.navScale - 14) * vp.S,
      },
    } : d));
    // We intentionally omit `det` from deps: it would re-run on every job swap.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vp.w, vp.h, vp.navLeft, vp.navTop, vp.navScale, vp.S, vp.B, vp.heroScale]);

  const goToJob = useCallback((target: Job) => {
    if (!det || det.phase !== 'nav' || swapping) return;
    clearSwapTimers();
    setSwapping(true);
    swapTimers.current.push(setTimeout(() => {
      setDet((d) => (d ? { ...d, job: target } : d));
    }, 420));
    swapTimers.current.push(setTimeout(() => setSwapping(false), 720));
  }, [det, swapping]);

  const neighborList = jobs.filter((j) => filter === 'All' || j.type === filter);
  const detIdx = det ? neighborList.findIndex((j) => j.company === det.job.company) : -1;
  const prevJob = detIdx > 0 ? neighborList[detIdx - 1] : null;
  const nextJob = detIdx >= 0 && detIdx < neighborList.length - 1 ? neighborList[detIdx + 1] : null;
  const goPrev = useCallback(() => { if (prevJob) goToJob(prevJob); }, [prevJob, goToJob]);
  const goNext = useCallback(() => { if (nextJob) goToJob(nextJob); }, [nextJob, goToJob]);

  // Global keyboard: menu arrows, intro skip, Escape, exit screen.
  useEffect(() => {
    const onKey = (ev: KeyboardEvent) => {
      if (exitOpen) {
        if (ev.key === 'Enter' || ev.key === 'Escape') setExitOpen(false);
        return;
      }
      if (!entered) {
        // Ignore all keyboard input until the title animation finishes —
        // menu interaction only unlocks once introDone fires.
        if (!introDone) return;
        if (ev.key === 'ArrowDown') {
          ev.preventDefault();
          setSel((v) => (v + 1) % 3);
        } else if (ev.key === 'ArrowUp') {
          ev.preventDefault();
          setSel((v) => (v + 2) % 3);
        } else if (ev.key === 'Enter') {
          pickMenu(sel);
        }
        return;
      }
      if (ev.key === 'Escape') {
        if (det) closeDet();
        else if (viewMode === 'about') setViewMode('cards');
        return;
      }
      if (det && det.phase === 'nav' && !swapping) {
        if (ev.key === 'ArrowLeft') {
          ev.preventDefault();
          goPrev();
        } else if (ev.key === 'ArrowRight') {
          ev.preventDefault();
          goNext();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [
    exitOpen, entered, introDone, sel, det, viewMode, swapping,
    pickMenu, closeDet, goPrev, goNext,
  ]);

  const swapFilter = (value: 'All' | JobType) => {
    if (value === filter) return;
    setFilter(value);
    setReelKey((k) => k + 1);
  };

  const tint = (() => {
    if (!cardsOn || leaving) return null;
    if (det) return det.job.brand;
    return hover ? hover.brand : null;
  })();
  const glowColor = tint ? mix(tint, '#8fa6b4', 55) : 'rgba(205,228,242,.42)';
  const mistColor = tint ? mix(tint, '#8fa6b4', 50) : 'rgba(140,170,190,.44)';
  const emberColor = tint ? mix(tint, '#cfe3ee', 65) : '#cfe3ee';

  const fade = entered ? 0 : 1;
  const contentOpacity = leaving ? 0 : 1;
  const nameActive = cardsOn && !det;

  const underStyle: React.CSSProperties = det
    ? { filter: 'opacity(0)', visibility: 'hidden', transition: 'filter .35s ease, visibility 0s linear .35s' }
    : { filter: 'opacity(1)', visibility: 'visible', transition: 'filter .4s ease' };

  const visibleJobs = jobs.filter((j) => filter === 'All' || j.type === filter);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        height: '100dvh',
        overflow: 'hidden',
        background: '#000',
      }}
    >
      <div
        ref={sceneRef}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 50% 40%, #10161c 0%, #05070a 60%, #000 100%)',
          animation: 'fadeIn 1.2s ease both',
          overflow: 'hidden',
        }}
      >
        <Ambient
          glow={glowColor}
          mist={mistColor}
          ember={emberColor}
          play={paused ? 'paused' : 'running'}
        />

        {/* Title block + menu + hint */}
        {!titleOff && (
          <React.Fragment key={titleKey}>
            <div
              style={{
                position: 'absolute',
                zIndex: 5,
                // Nav position scales with S (same system as the rest of the UI).
                left: entered ? rem(vp.navLeft) : '50%',
                top: entered ? rem(vp.navTop) : vp.titleTop,
                // The block itself is hero-scaled, so when entered we divide the
                // transform scale by B to keep the on-screen size at S × navScale.
                transform: entered
                  ? `translateX(0) scale(${vp.navScale / vp.B})`
                  : `translateX(${-50 * vp.titleScale}%) scale(${vp.titleScale})`,
                transformOrigin: 'top left',
                opacity: contentOpacity,
                transition: `left 1.1s ${EASE_EMPH}, top 1.1s ${EASE_EMPH}, transform 1.1s ${EASE_EMPH}, opacity .6s ease`,
                pointerEvents: 'none',
              }}
            >
              {/* Title block: subtitle, name, divider all scale by heroScale. */}
              <div style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: heroPx(14),
              }}
              >
                <div style={{ opacity: fade, transition: 'opacity .5s ease' }}>
                  <div
                    style={{
                      fontFamily: CINZEL,
                      fontSize: heroPx(13),
                      letterSpacing: '.4em',
                      color: '#8fa6b4',
                      animation: `fadeIn ${T.subDur} ease ${T.sub} both`,
                    }}
                  >
                    THE CAREER OF
                  </div>
                </div>
                <button
                  type="button"
                  ref={nameRef}
                  onClick={(ev) => {
                    ev.stopPropagation();
                    backToTitle();
                  }}
                  tabIndex={nameActive ? 0 : -1}
                  className="rm-fade"
                  style={{
                    fontFamily: CINZEL,
                    fontWeight: 600,
                    fontSize: heroPx(54),
                    letterSpacing: '.16em',
                    color: '#eef3f6',
                    textShadow: `0 0 ${heroPx(24)} rgba(200,225,240,.35)`,
                    whiteSpace: 'nowrap',
                    pointerEvents: nameActive ? 'auto' : 'none',
                    cursor: 'pointer',
                    outline: 'none',
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    animation: `titleIn ${T.titleDur} ${EASE_OUT} ${T.title} both`,
                  }}
                >
                  SAMORI ROBERTS
                </button>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: heroPx(12),
                    width: heroPx(440),
                    opacity: fade,
                    transition: 'opacity .5s ease',
                    animation: `fadeIn 1s ease ${T.div} both`,
                  }}
                >
                  <div
                    style={{
                      flex: 1,
                      height: 1,
                      background: 'linear-gradient(90deg, transparent, #8fa6b4)',
                      transformOrigin: 'right',
                      animation: `grow 1.2s cubic-bezier(.6,0,.2,1) ${T.div} both`,
                    }}
                  />
                  <Diamond size={heroPx(7)} filled={false} />
                  <div
                    style={{
                      flex: 1,
                      height: 1,
                      background: 'linear-gradient(90deg, #8fa6b4, transparent)',
                      transformOrigin: 'left',
                      animation: `grow 1.2s cubic-bezier(.6,0,.2,1) ${T.div} both`,
                    }}
                  />
                </div>
              </div>
            </div>

            <div
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: vp.menuTop,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: rem(6),
                opacity: fade,
                pointerEvents: entered ? 'none' : 'auto',
                transition: 'opacity .5s ease',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: rem(6),
                  animation: `fadeIn 1s ease ${T.menu} both`,
                }}
              >
                {MENU.map((label, i) => (
                  <button
                    type="button"
                    key={label}
                    tabIndex={-1}
                    onMouseEnter={() => setSel(i)}
                    onClick={(ev) => {
                      ev.stopPropagation();
                      if (introDone) pickMenu(i);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: rem(14),
                      cursor: 'pointer',
                      // Mobile tap target is at least 44px tall.
                      padding: vp.isMobile ? `${rem(11)} ${rem(8)}` : `${rem(4)} ${rem(8)}`,
                      background: 'none',
                      border: 'none',
                      outline: 'none',
                    }}
                  >
                    <Diamond glow style={{ opacity: sel === i ? 1 : 0, transition: 'opacity .25s' }} />
                    <span
                      style={{
                        fontFamily: CINZEL,
                        fontSize: rem(17),
                        letterSpacing: '.12em',
                        color: sel === i ? '#ffffff' : '#7d8f9a',
                        transition: 'color .25s',
                        minWidth: rem(120),
                        textAlign: 'center',
                      }}
                    >
                      {label}
                    </span>
                    <Diamond glow style={{ opacity: sel === i ? 1 : 0, transition: 'opacity .25s' }} />
                  </button>
                ))}
              </div>
            </div>

            <div
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: rem(18),
                textAlign: 'center',
                opacity: fade,
                transition: 'opacity .5s ease',
                pointerEvents: 'none',
              }}
            >
              <span
                style={{
                  fontFamily: CINZEL,
                  fontSize: rem(10),
                  letterSpacing: '.3em',
                  color: '#5b6b75',
                  animation: `pulse 2.4s ease-in-out ${T.hint} infinite both`,
                }}
              >
                SELECT TO BEGIN
              </span>
            </div>
          </React.Fragment>
        )}

        {/* Cards / About layer */}
        {cardsOn && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              opacity: contentOpacity,
              transition: 'opacity .6s ease',
            }}
          >
            {viewMode === 'about' ? (
              <AboutPanel w={vp.w} />
            ) : (
              <CardReel
                reelKey={reelKey}
                jobs={visibleJobs}
                filter={filter}
                onFilter={swapFilter}
                hoverCompany={hover ? hover.company : null}
                onHover={setHover}
                onOpen={openDet}
                edges={edges}
                onScroll={measureReel}
                setReelEl={setReelEl}
                underStyle={underStyle}
                isMobile={vp.isMobile}
              />
            )}

            <div
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: rem(14),
                textAlign: 'center',
                fontFamily: CORMORANT,
                fontSize: rem(11.5),
                letterSpacing: '.04em',
                color: '#6f8390',
                animation: 'fadeIn 1s ease .8s both',
              }}
            >
              {`© ${new Date().getFullYear()} Samori Roberts. All rights reserved.`}
            </div>

            {det && (
              <DetailsOverlay
                det={det}
                onClose={closeDet}
                prevJob={prevJob}
                nextJob={nextJob}
                onPrev={goPrev}
                onNext={goNext}
                swapping={swapping}
                w={vp.w}
                isMobile={vp.isMobile}
              />
            )}
          </div>
        )}

        {exitOpen && <ExitOverlay isMobile={vp.isMobile} />}
      </div>
    </div>
  );
};

export default HomeExperience;
