import React, { useMemo } from 'react';
import { ArticleNode } from '@/articles/types';

import HeadingSection from './HeadingSection';
import TextSection from './TextSection';
import ImageSection from './ImageSection';

const ArticleSection = ({ node }: { node: ArticleNode }) => {
  const { type, data } = node;

  const Node = useMemo(() => {
    switch (type) {
      case 'heading':
        return (
          <HeadingSection text={data} />
        );
      case 'text':
        return (
          <TextSection text={data} />
        );
      case 'image':
        return (
          <ImageSection src={data} />
        );
      default:
        return null;
    }
  }, [type, data]);

  return Node;
};

export default ArticleSection;
