import React from 'react';
import NavigationBar from './Bar';
import NavigationFooter from './Footer';

const NavigationWrapper = (props: any) => {
  const { children } = props;

  return (
    <>
      <div className="fixed inset-0 flex justify-center sm:px-8 bg-black">
        <div className="flex w-full max-w-7xl lg:px-8">
          <div className="w-full bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20" />
        </div>
      </div>
      <div className="relative">
        <NavigationBar />
        <main>
          { children }
        </main>
        <NavigationFooter />
      </div>
    </>
  );
};

export default NavigationWrapper;
