'use client';

import React, { useEffect } from 'react';

import ArticleCard from '@/components/ArticleCard';
import NavigationWrapper from '@/components/NavigationWrapper';
import SimpleLayout from '@/components/SimpleLayout';

import allArticles from '@/articles/all';

const ArticlesScreen = () => {
  useEffect(() => {
    document.title = 'Articles - Samori Roberts';
  });

  return (
    <NavigationWrapper>
      <SimpleLayout
        title="Articles on software, quantitative finance, exercise, video games and everything else that brings me joy."
        intro="A collection of deep dives and tutorials from my personal and professional experiences."
      >
        <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
          <div className="flex max-w-3xl flex-col space-y-16">
            {allArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </SimpleLayout>
    </NavigationWrapper>
  );
};

export default ArticlesScreen;
