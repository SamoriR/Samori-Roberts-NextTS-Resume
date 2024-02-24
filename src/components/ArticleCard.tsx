import React from 'react';
import formatDate from '@/libs/formatDate';
import Card, {
  CardDate,
  CardDescription,
  CardMoreLink,
  CardTitle,
} from './Card';
import { Article } from '@/articles/types';

const ArticleCard = ({
  article,
}: {
  article: Article;
}) => (
  <Card as="article">
    <CardTitle href={`/article/${article.id}`}>
      {article.title}
    </CardTitle>
    <CardDate as="time" dateTime={article.date} decorate>
      {formatDate(article.date)}
    </CardDate>
    <CardDescription>{article.description}</CardDescription>
    <CardMoreLink>Read article</CardMoreLink>
  </Card>
);

export default ArticleCard;
