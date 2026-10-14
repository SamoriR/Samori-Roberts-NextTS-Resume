'use client';

import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';

import jobs, { Job, JobType } from '@/data/jobs';
import {
  CINZEL, CORMORANT, EASE_EMPH, EASE_OUT, FULL_T, MENU, mix, SHORT_T,
} from './constants';
import { Diamond } from './ui';
import Ambient from './Ambient';
import AboutPanel from './AboutPanel';
import CardReel from './CardReel';
import DetailsOverlay, { DetState, Phase } from './DetailsOverlay';
import ExitOverlay from './ExitOverlay';

const HomeExperience = () => {
  const [scale, setScale] = useState(1);
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

  const sceneRef = useRef<HTMLDivElement>(null);
  const reelRef = useRef<HTMLDivElement | null>(null);
  const nameRef = useRef<HTMLButtonElement>(null);
  const detTimers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const T = short ? SHORT_T : FULL_T;

  const clearDetTimers = () => {
    detTimers.current.forEach(clearTimeout);
    detTimers.current = [];
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

  // Viewport scaling: the design is a 860x500 stage; scale values proportionally.
  useEffect(() => {
    const onResize = () => {
      const s = Math.min(window.innerWidth / 860, window.innerHeight / 500);
      setScale(Math.min(Math.max(s, 0.45), 2.4));
      measureReel();
    };
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [measureReel]);

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

  const skipIntro = useCallback(() => {
    setShort(true);
    sessionStorage.setItem('introMode', 'short');
    setIntroDone(false);
    setTitleOff(true);
    setTimeout(() => {
      setTitleOff(false);
      setTitleKey((k) => k + 1);
    }, 40);
  }, []);

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
    const sc = s.width / scene.offsetWidth || 1;
    const r = cardEl.getBoundingClientRect();
    const rect = {
      l: (r.left - s.left) / sc,
      t: (r.top - s.top) / sc,
      w: r.width / sc,
      h: r.height / sc,
      lx: 0,
      ly: 0,
    };
    const lg = cardEl.querySelector('[data-logo]');
    if (lg) {
      const g = lg.getBoundingClientRect();
      rect.lx = ((g.left + g.width / 2) - (r.left + r.width / 2)) / sc;
      rect.ly = ((g.top + g.height / 2) - (r.top + r.height / 2)) / sc;
    }
    let nav = { l: 279, t: 20 };
    const name = nameRef.current;
    if (name) {
      const n = name.getBoundingClientRect();
      nav = {
        // clear the name plus the 5px diamond that sits 12px left of the logo
        l: (n.right - s.left) / sc + 30,
        t: (n.top - s.top) / sc + (n.height / sc - 28) / 2,
      };
    }
    clearDetTimers();
    setDet({
      job, rect, W: scene.offsetWidth, H: scene.offsetHeight, nav, phase: 'start',
    });
    const phase = (p: Phase) => setDet((d) => (d ? { ...d, phase: p } : d));
    detTimers.current.push(setTimeout(() => phase('full'), 380));
    detTimers.current.push(setTimeout(() => phase('logo'), 930));
    detTimers.current.push(setTimeout(() => phase('nav'), 1380));
  }, [det]);

  // Global keyboard: menu arrows, intro skip, Escape, exit screen.
  useEffect(() => {
    const onKey = (ev: KeyboardEvent) => {
      if (exitOpen) {
        if (ev.key === 'Enter' || ev.key === 'Escape') setExitOpen(false);
        return;
      }
      if (!entered) {
        if (!introDone) {
          skipIntro();
          return;
        }
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
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [exitOpen, entered, introDone, sel, det, viewMode, skipIntro, pickMenu, closeDet]);

  // Click anywhere during the intro restarts it with the short timing.
  useEffect(() => {
    if (entered || introDone) return undefined;
    const onDown = () => skipIntro();
    window.addEventListener('pointerdown', onDown);
    return () => window.removeEventListener('pointerdown', onDown);
  }, [entered, introDone, skipIntro]);

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
    <div style={{
      position: 'fixed', inset: 0, overflow: 'hidden', background: '#000',
    }}
    >
      <div
        ref={sceneRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: `calc(100vw / ${scale})`,
          height: `calc(100vh / ${scale})`,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
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
                left: entered ? 28 : '50%',
                top: entered ? 12 : '24%',
                transform: entered ? 'translateX(0) scale(.36)' : 'translateX(-50%) scale(1)',
                transformOrigin: 'top left',
                opacity: contentOpacity,
                transition: `left 1.1s ${EASE_EMPH}, top 1.1s ${EASE_EMPH}, transform 1.1s ${EASE_EMPH}, opacity .6s ease`,
                pointerEvents: 'none',
              }}
            >
              <div style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14,
              }}
              >
                <div style={{ opacity: fade, transition: 'opacity .5s ease' }}>
                  <div
                    style={{
                      fontFamily: CINZEL,
                      fontSize: 13,
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
                    fontSize: 54,
                    letterSpacing: '.16em',
                    color: '#eef3f6',
                    textShadow: '0 0 24px rgba(200,225,240,.35)',
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
                    gap: 12,
                    width: 440,
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
                  <Diamond size={7} filled={false} />
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
                top: '58%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 6,
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
                  gap: 6,
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
                      gap: 14,
                      cursor: 'pointer',
                      padding: '4px 8px',
                      background: 'none',
                      border: 'none',
                      outline: 'none',
                    }}
                  >
                    <Diamond glow style={{ opacity: sel === i ? 1 : 0, transition: 'opacity .25s' }} />
                    <span
                      style={{
                        fontFamily: CINZEL,
                        fontSize: 17,
                        letterSpacing: '.12em',
                        color: sel === i ? '#ffffff' : '#7d8f9a',
                        transition: 'color .25s',
                        minWidth: 120,
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
                bottom: 18,
                textAlign: 'center',
                opacity: fade,
                transition: 'opacity .5s ease',
                pointerEvents: 'none',
              }}
            >
              <span
                style={{
                  fontFamily: CINZEL,
                  fontSize: 10,
                  letterSpacing: '.3em',
                  color: '#5b6b75',
                  animation: `pulse 2.4s ease-in-out ${T.hint} infinite both`,
                }}
              >
                {short ? 'SELECT TO BEGIN' : 'SELECT TO BEGIN  ·  CLICK TO SKIP'}
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
              <AboutPanel />
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
              />
            )}

            <div
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 14,
                textAlign: 'center',
                fontFamily: CORMORANT,
                fontSize: 11.5,
                letterSpacing: '.04em',
                color: '#6f8390',
                animation: 'fadeIn 1s ease .8s both',
              }}
            >
              {`© ${new Date().getFullYear()} Samori Roberts. All rights reserved.`}
            </div>

            {det && <DetailsOverlay det={det} onClose={closeDet} />}
          </div>
        )}

        {exitOpen && <ExitOverlay />}
      </div>
    </div>
  );
};

export default HomeExperience;
