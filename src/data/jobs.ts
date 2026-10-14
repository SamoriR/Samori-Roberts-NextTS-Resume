import logoNorn from '@/images/logo-norn.svg';
import logoPowerBI from '@/images/logo-powerbi.svg';
import logoDescript from '@/images/logo-descript.png';
import logoCodexDF from '@/images/logo-codexdf.png';
import logoHumble from '@/images/logo-humble.png';
import logoFeedback from '@/images/logo-feedback.png';
import logoOneNote from '@/images/logo-onenote.png';

export type JobType = 'Full-time Job' | 'Side Project';

export interface Job {
  company: string;
  title: string;
  type: JobType;
  brand: string;
  years: string;
  summary: string;
  work: string[];
  logo: string;
  logoFit?: 'cover' | 'contain';
}

// Bullet points are verbatim from sr-resume-08-29-26.pdf (emdashes replaced per copy rules).
const jobs: Job[] = [
  {
    company: 'Norn',
    title: 'CEO',
    type: 'Side Project',
    brand: '#62d0c6',
    years: '2023 – Present',
    summary:
      'Norn is a quantitative research and portfolio platform covering every S&P 500 constituent plus major indices across 10 years of history.',
    work: [
      'Raised $25K through a pre-accelerator and solo-built a quantitative research and portfolio platform: performance analysis, correlation checking, portfolio optimization, automated monitoring, AI-assisted research, and trade tracking',
      'Built an MCP server supporting Dynamic Client Registration, letting AI clients connect to Norn’s data without manually provisioned credentials',
      'Owned the entire stack: a Next.js frontend with Auth0 and SnapTrade brokerage aggregation, backed by a Dockerized Django service with Postgres, Redis, Celery, and Stripe on DigitalOcean at norndata.ai',
    ],
    logo: logoNorn.src,
  },
  {
    company: 'Power BI',
    title: 'Software Engineer 2',
    type: 'Full-time Job',
    brand: '#F2C811',
    years: '2024 – Present',
    summary:
      'Power BI is Microsoft’s data visualization and business intelligence platform. I work on AI evaluation infrastructure and full-stack development.',
    work: [
      'Pioneered AI evaluations for the Power BI Modeling Agent: built its eval harness using LLM and programmatic judges, created the initial scoring and reporting system, and authored the template the team now uses for every Modeling Agent benchmark',
      'Designed and built a team-wide eval platform on two internal frameworks covering every AI scenario in Power BI; every partner team is onboarding their scenarios to run evals and report results to leadership. Release gating ships next',
      'Evals surfaced material agent defects pre-ship: semantic model resolution failures, low-quality model-improvement recommendations, and broken multi-turn conversation handling',
      'Shipped Diagram Layouts for Remote Modeling solo in 2 months, bringing cloud-hosted models to parity with local modeling in Power BI Desktop for ~10,000 monthly users',
    ],
    logo: logoPowerBI.src,
  },
  {
    company: 'Descript',
    title: 'Software Engineer',
    type: 'Full-time Job',
    brand: '#5b5bf0',
    years: '2023 – 2024',
    summary:
      'Descript is an AI-powered video and podcast editor used by creators around the world. I worked on front-end development and growth.',
    work: [
      'Built the consent flow for AI voice cloning, a launch-blocking dependency for shipping the AI team’s newest voice model to users',
      'Rebuilt onboarding from a linear flow into a decision tree, letting marketing-campaign traffic skip redundant steps while capturing more profile data for growth targeting',
      'Shipped in-app guides for the Learn Descript platform, moving new users to first value without leaving the product',
    ],
    logo: logoDescript.src,
  },
  {
    company: 'CodexDF',
    title: 'Lead Software Engineer',
    type: 'Full-time Job',
    brand: '#14b8a6',
    years: '2022',
    summary:
      'CodexDF is a Web3 tax and compliance platform. I led engineering from architecture to delivery, owning full-stack development and technical leadership.',
    work: [
      'Architected the MVP and led 8 engineers to ship the Alpha release on a 6-month roadmap I defined, giving the C-suite dates they could commit to with customers and investors',
      'Ran technical diligence conversations with investors during a $2.5M pre-seed raise and set the technical direction for Beta',
    ],
    logo: logoCodexDF.src,
  },
  {
    company: 'Humble',
    title: 'Founder',
    type: 'Side Project',
    brand: '#f97316',
    years: '2021',
    summary: 'An NFT marketplace built on the Flow blockchain.',
    work: [],
    logo: logoHumble.src,
    logoFit: 'cover',
  },
  {
    company: 'Feedback',
    title: 'Founder',
    type: 'Side Project',
    brand: '#ec4899',
    years: '2019 – 2020',
    summary: 'A social media statistics and networking platform.',
    work: [],
    logo: logoFeedback.src,
  },
  {
    company: 'OneNote',
    title: 'Software Engineer 2',
    type: 'Full-time Job',
    brand: '#7719AA',
    years: '2018 – 2022',
    summary:
      'OneNote is Microsoft’s digital note-taking app. I worked on front-end development and accessibility, shipping collaboration and note-taking experiences at scale.',
    work: [
      'Built the proof of concept for OneNote Win32 Home, presented to Satya Nadella; it was well received and shaped the initiative leadership ultimately funded',
      'Led 3 engineers through ~60 accessibility tasks in a 6-week window to hit a compliance deadline, delivering Windows Text Scaling support in OneNote UWP, and implemented 4 of the 5 major UI components in the OneNote Win32 redesign',
    ],
    logo: logoOneNote.src,
  },
];

export default jobs;
