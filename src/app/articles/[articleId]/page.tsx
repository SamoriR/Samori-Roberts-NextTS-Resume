'use client';

import React, { useEffect, useMemo } from 'react';

import { useParams } from 'next/navigation';
import NavigationWrapper from '@/components/NavigationWrapper';
import ArticlePage from '@/components/Article/Area';
import { getArticleFromId } from '@/articles/utils';
import Container from '@/components/Container';

const ArticleViewerScreen = () => {
  const { articleId } = useParams<{ articleId?: string }>();

  const article = useMemo(() => {
    if (!articleId) {
      return undefined;
    }

    const currentArticle = getArticleFromId(articleId);
    return currentArticle;
  }, [articleId]);

  useEffect(() => {
    if (article) {
      document.title = article.title;
      window.scrollTo(0, 0);
    }
  }, [article]);

  if (!article) {
    return null;
  }

  return (
    <NavigationWrapper>
      <Container outerClassName="mt-16 sm:mt-32">
        <ArticlePage
          date={article.date}
          heading={article.title}
          content={article.content}
        />
      </Container>
    </NavigationWrapper>
  );
};

export default ArticleViewerScreen;
