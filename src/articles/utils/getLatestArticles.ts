import allArticles from '../all';
import { Article } from '../types';

const getLatestArticles = (n: number) => {
  const sorted = allArticles.sort((a: Article, b: Article) => {
    const dateB = new Date(b.date);
    const dateA = new Date(a.date);
    return dateB.valueOf() - dateA.valueOf();
  });

  return sorted.slice(0, n);
};

export default getLatestArticles;
