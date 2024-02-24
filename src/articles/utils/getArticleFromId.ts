import allArticles from '../all';

const getArticleFromId = (id: string) => allArticles.find((article) => article.id === id);

export default getArticleFromId;
