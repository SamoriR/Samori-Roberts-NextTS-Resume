import urls from '@/data/urls';
import { JobType } from '@/data/jobs';

export const CINZEL = 'var(--font-cinzel), Georgia, serif';
export const CORMORANT = 'var(--font-cormorant), Georgia, serif';

export const EASE_OUT = 'cubic-bezier(.2,.8,.2,1)';
export const EASE_EMPH = 'cubic-bezier(.7,0,.2,1)';

export const FULL_T = {
  sub: '0.4s', subDur: '1.2s', title: '0.7s', titleDur: '2s', div: '2s', menu: '2.8s', hint: '3.6s', done: 3800,
};
export const SHORT_T = {
  sub: '0s', subDur: '0.5s', title: '0.1s', titleDur: '0.9s', div: '0.5s', menu: '0.8s', hint: '1.3s', done: 1400,
};

export const MENU = ['Enter', 'About', 'Exit'];

export const FILTERS: { label: string; value: 'All' | JobType }[] = [
  { label: 'ALL', value: 'All' },
  { label: 'FULL-TIME', value: 'Full-time Job' },
  { label: 'PROJECT', value: 'Side Project' },
];

export const LINKS = [
  { label: 'RESUME', href: '/samori_roberts_resume.pdf' },
  { label: 'GITHUB', href: urls.github },
  { label: 'LINKEDIN', href: urls.linkedIn },
  { label: 'EMAIL', href: urls.email },
];

export const BIO = 'Samori Roberts is a 2018 graduate of Morehouse College, where he earned a B.S. in Physics with a minor in Computer Science. Since then he has built software across a wide range of domains: Web3 tax compliance, AI video editing, digital note-taking, corporate business intelligence, and financial data science. As an engineer and leader, he has shaped products through hands-on implementation, technical consultation, and team leadership.';

export const NOW = 'Today he focuses his time and energy in four areas: AI evaluations for Power BI’s AI initiatives, democratizing investment research through Norn, creative pursuits that include building his own video game, and engaging and assisting the cosplay, influencer, and streamer communities.';

export const EMAIL = 'samori.roberts@gmail.com';

export const mix = (c: string, base: string, pct: number) => `color-mix(in oklab, ${c} ${pct}%, ${base})`;
