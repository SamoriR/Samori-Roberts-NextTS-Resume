'use client';

import React, { useEffect } from 'react';

import Container from '@/components/Container';
import NavigationWrapper from '@/components/NavigationWrapper';

import aboutImage from '@/images/photos/about/img-1.jpg';
import Social from '@/components/social';

const AboutScreen = () => {
  useEffect(() => {
    document.title = 'Articles - Samori Roberts';
  });

  return (
    <NavigationWrapper>
      <Container outerClassName="mt-16 sm:mt-32">
        <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
          <div className="lg:pl-20">
            <div className="max-w-xs px-2.5 lg:max-w-none">
              <img
                src={aboutImage.src}
                alt=""
                sizes="(min-width: 1024px) 32rem, 20rem"
                className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
              />
            </div>
          </div>
          <div className="lg:order-first lg:row-span-2">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
              I am Samori Roberts, and I am always excited for a new adventure.
            </h1>
            <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
              <p>
                I graduated Morehouse College in 2018 with a degree in Physics and
                a minor in Computer Science. YES YES I KNOW, &ldquo;But Samori Samori!
                Degree in Physics? What happened??&ldquo; Well Mathematical Physics 1
                with Dr. Moore happened! One of the hardest classes I&apos;ve ever taken
                and gave me a decent taste of theorhetical physic; which was a HARD
                pass. I clutched an A- and decided to find something else for me to
                do for the rest of my life. I found CS, took classes at Stanford,
                interviewed for Microsoft and got a Software Engineering position
                with OneNote. And haven&apos;t solved a physics related problem since and
                I couldn&apos;t be happier.
              </p>
              <p>
                At Microsoft I developed most of my CS skills with some of the most
                talented people I&apos;ve ever met. There I learned how to not only be
                an amazing IC, but a caring and supportive coworker. I honor the love
                they&apos;ve showen me by taking their teachings around clarity,
                understanding, and collaboration to every team I work with.
              </p>
              <p>
                As a contractor and technical advisor, I&apos;ve worked with a number of
                early stage businesses and start-ups. I have a lot of experience on the
                dos and don&apos;ts through experience, and love sharing my findings with
                anybody who wants to learn!
              </p>
            </div>
          </div>
          <div className="lg:pl-20">
            <ul className="flex flex-col space-y-4">

              <Social.InstagramLink showLabel />
              <Social.GitHubLink showLabel />
              <Social.LinkedInLink showLabel />
              <Social.EmailLink showLabel />
            </ul>
          </div>
        </div>
      </Container>
    </NavigationWrapper>
  );
};

export default AboutScreen;
