import { Api } from './axios';
import { Article } from '@/types';

export type ArticleRequest = {
  article: Partial<Article>;
};

export type ArticleResponse = {
  article: Article;
};

export type ArticlesResponse = {
  articles: Array<Article>;
  articlesCount: number;
};

export type TagsResponse = {
  tags: string[];
};

export const getGlobalFeed = (limit: number, offset: number, tag?: string) => {
  return Api.get<ArticlesResponse>('/articles', {
    params: {
      limit,
      offset,
      tag,
    },
  });
};
export const getYourFeed = (limit: number, offset: number, tag?: string) => {
  return Api.get<ArticlesResponse>('/articles/feed', {
    params: {
      limit,
      offset,
      tag,
    },
  });
};
export const getArticle = (slug: string) => Api.get<ArticleResponse>(`/articles/${slug}`);
export const createArticle = (data: ArticleRequest) =>
  Api.post<ArticleResponse>('/articles/', data);
export const updateArticle = (data: ArticleRequest) =>
  Api.put<ArticleResponse>(`/articles/${data.article.slug}`, data);
export const deleteArticle = (slug: string) => Api.delete<ArticleResponse>(`/articles/${slug}`);
export const getTags = () => Api.get<TagsResponse>('/tags');
