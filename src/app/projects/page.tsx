'use client';

import React, { useEffect } from 'react';

import Card, { CardLink, CardDescription, CardMoreLink } from '@/components/Card';
import NavigationWrapper from '@/components/NavigationWrapper';
import SimpleLayout from '@/components/SimpleLayout';

import logoMe from '@/images/avatar.jpg';
import logoDescript from '@/images/logos/descript.png';
import logoCodexDF from '@/images/logos/cdf.png';
import logoHumble from '@/images/logos/humble.png';
import logoFeedback from '@/images/logos/feedback.png';
import logoOneNote from '@/images/logos/microsoft-onenote.png';

const projects = [
  {
    name: 'This Website!',
    description:
      'A living example of what I can do.',
    href: '',
    logo: logoMe.src,
  },
  {
    name: 'Descript',
    description:
      'AI video editing software.',
    href: '',
    logo: logoDescript.src,
  },
  {
    name: 'CodexDF',
    description:
      'Web3 tax and compliance software.',
    href: '',
    logo: logoCodexDF.src,
  },
  {
    name: 'Humble',
    description:
      'NFT marketplace built on the Flow blockchain',
    href: '',
    logo: logoHumble.src,
  },
  {
    name: 'Feedback',
    description:
      'Social media statistics and networking platform.',
    href: '',
    logo: logoFeedback.src,
  },
  {
    name: 'OneNote',
    description:
      'Digital note taking app.',
    href: '',
    logo: logoOneNote.src,
  },
];

const ProjectsScreen = () => {
  useEffect(() => {
    document.title = 'Projects - Samori Roberts';
  });

  return (
    <NavigationWrapper>
      <SimpleLayout
        title="Products I've made sginificant contributions to."
        intro="I have worked on tons of projects, big and small, over the years and the following are ones that helped me become the professional I am today. Unfortunately, most are not open-source, but if something piques your interest feel free to read the post mortem for the product and reach out if there is anything you would like to learn more about."
      >
        <ul
          className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project) => (
            <Card as="li" key={project.name}>
              <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
                <img
                  src={project.logo}
                  alt=""
                  className="w-7"
                />
              </div>
              <h2 className="mt-6 text-base font-semibold text-zinc-800 dark:text-zinc-100">
                <CardLink href={project.href}>{project.name}</CardLink>
              </h2>
              <CardDescription>{project.description}</CardDescription>
              <CardMoreLink>Read article</CardMoreLink>
            </Card>
          ))}
        </ul>
      </SimpleLayout>
    </NavigationWrapper>
  );
};

export default ProjectsScreen;
